import React, { useState, useEffect } from 'react';
import {
  ref as storageRef,
  uploadBytes,
  getDownloadURL,
  deleteObject, // ✅ ADDED
} from 'firebase/storage';
import {
  ref as dbRef,
  set,
  update,
  remove,
  get,
  push,
  serverTimestamp
} from 'firebase/database';
import { rtdb, storage } from '@/lib/firebase';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Switch } from '@/components/ui/switch';
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle
} from '@/components/ui/card';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger
} from '@/components/ui/dialog';
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from '@/components/ui/alert-dialog';
import { Plus, Trash2, Edit, Calendar, Image as ImageIcon } from 'lucide-react';
import { format } from 'date-fns';

interface PopupData {
  id: string;
  title: string;
  description: string;
  imageUrl: string;
  imagePath?: string; // ✅ ADDED
  active: boolean;
  startDate: Date;
  endDate: Date;
}

const PopupManager = () => {
  const [popups, setPopups] = useState<PopupData[]>([]);
  const [loading, setLoading] = useState(true);
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false);
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false);
  const [selectedPopup, setSelectedPopup] = useState<PopupData | null>(null);

  // Form state
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [imagePreview, setImagePreview] = useState('');
  const [active, setActive] = useState(true);
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState('');

  const [removeImage, setRemoveImage] = useState(false); // ✅ ADDED (tracks if user clicked remove image)

  // Fetch popups from Realtime Database
  useEffect(() => {
    const fetchPopups = async () => {
      try {
        console.log("Fetching popups from Realtime Database");
        const popupsRef = dbRef(rtdb, 'popups');

        const snapshot = await get(popupsRef);
        console.log("Snapshot exists:", snapshot.exists());

        const fetchedPopups: PopupData[] = [];

        if (snapshot.exists()) {
          const data = snapshot.val();
          console.log("Raw popups data from Realtime Database:", data);

          Object.keys(data).forEach((key) => {
            try {
              const popupData = data[key];
              console.log(`Processing popup ${key}:`, popupData);

              if (!popupData) return;

              let startDateObj: Date;
              let endDateObj: Date;

              try {
                startDateObj = new Date(popupData.startDate);
                endDateObj = new Date(popupData.endDate);
              } catch (timeError) {
                console.error(`Error processing dates for popup ${key}:`, timeError);
                startDateObj = new Date();
                endDateObj = new Date();
              }

              fetchedPopups.push({
                id: key,
                title: popupData.title || 'Untitled',
                description: popupData.description || '',
                imageUrl: popupData.imageUrl || '',
                imagePath: popupData.imagePath || '', // ✅ ADDED
                active: popupData.active ?? false, // ✅ UPDATED (was popupData.active || false)
                startDate: startDateObj,
                endDate: endDateObj
              });
            } catch (popupError) {
              console.error(`Error processing popup ${key}:`, popupError);
            }
          });

          fetchedPopups.sort((a, b) => b.startDate.getTime() - a.startDate.getTime());
        }

        setPopups(fetchedPopups);
      } catch (error) {
        console.error('Error fetching popups:', error);
        setError('Failed to load popups. Please try again.');
      } finally {
        setLoading(false);
      }
    };

    fetchPopups();
  }, []);

  // Reset form state
  const resetForm = () => {
    setTitle('');
    setDescription('');
    setImageFile(null);
    setImagePreview('');
    setActive(true);
    setStartDate('');
    setEndDate('');
    setError('');
    setRemoveImage(false); // ✅ ADDED
  };

  // Open edit dialog and populate form
  const handleEditPopup = (popup: PopupData) => {
    setSelectedPopup(popup);
    setTitle(popup.title);
    setDescription(popup.description);
    setImagePreview(popup.imageUrl);
    setActive(popup.active);
    setStartDate(format(popup.startDate, 'yyyy-MM-dd'));
    setEndDate(format(popup.endDate, 'yyyy-MM-dd'));
    setRemoveImage(false); // ✅ ADDED
    setIsEditDialogOpen(true);
  };

  // Handle image file selection
  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      setImageFile(file);
      setRemoveImage(false); // ✅ ADDED (if they choose a file, they are not removing)

      const reader = new FileReader();
      reader.onloadend = () => {
        setImagePreview(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  // Upload image to Firebase Storage
  const uploadImage = async (file: File) => {
    try {
      const filename = `${Date.now()}_${file.name}`;
      const path = `popups/${filename}`; // ✅ ADDED
      const imageRef = storageRef(storage, path);

      await uploadBytes(imageRef, file);
      const url = await getDownloadURL(imageRef);

      return { url, path }; // ✅ UPDATED (was return downloadURL)
    } catch (error) {
      console.error("Error uploading image to Firebase Storage:", error);
      throw new Error("Failed to upload image. Please try again.");
    }
  };

  const deleteStorageImageIfAny = async (imagePath?: string) => { // ✅ ADDED
    if (!imagePath) return;
    try {
      const imgRef = storageRef(storage, imagePath);
      await deleteObject(imgRef);
    } catch (e) {
      // ignore (file may already be deleted)
      console.warn("Could not delete storage image:", e);
    }
  };

  // Add new popup
  const handleAddPopup = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!title || !description || !startDate || !endDate) {
      setError('Please fill in all required fields');
      return;
    }

    if (!imageFile && !imagePreview) {
      setError('Please upload an image');
      return;
    }

    try {
      setIsSubmitting(true);
      setError('');

      let imageUrl = imagePreview;
      let imagePath = ''; // ✅ ADDED

      if (imageFile) {
        try {
          const uploaded = await uploadImage(imageFile); // ✅ UPDATED
          imageUrl = uploaded.url; // ✅ ADDED
          imagePath = uploaded.path; // ✅ ADDED
        } catch (uploadError) {
          console.error("Image upload failed:", uploadError);
          setError('Failed to upload image. Please try again.');
          setIsSubmitting(false);
          return;
        }
      }

      const startTimestamp = new Date(startDate).getTime();
      const endTimestamp = new Date(endDate).getTime();

      const popupData = {
        title,
        description,
        imageUrl,
        imagePath, // ✅ ADDED
        active,
        startDate: startTimestamp,
        endDate: endTimestamp,
        createdAt: Date.now()
      };

      const popupsRef = dbRef(rtdb, 'popups');
      const newPopupRef = push(popupsRef);

      await set(newPopupRef, popupData);

      const newPopup: PopupData = {
        id: newPopupRef.key || '',
        title,
        description,
        imageUrl,
        imagePath, // ✅ ADDED
        active,
        startDate: new Date(startTimestamp),
        endDate: new Date(endTimestamp)
      };

      const updatedPopups = [...popups, newPopup];
      updatedPopups.sort((a, b) => b.startDate.getTime() - a.startDate.getTime());

      setPopups(updatedPopups);

      setIsAddDialogOpen(false);
      resetForm();
    } catch (error) {
      console.error('Error adding popup:', error);
      setError('Failed to add popup. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  // Update existing popup
  const handleUpdatePopup = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!selectedPopup) return;

    if (!title || !description || !startDate || !endDate) {
      setError('Please fill in all required fields');
      return;
    }

    try {
      setIsSubmitting(true);
      setError('');

      // start with existing values
      let imageUrl = imagePreview;
      let imagePath = selectedPopup.imagePath || ''; // ✅ ADDED

      // If user explicitly removed image
      if (removeImage) { // ✅ ADDED
        // delete old storage file (if we have path)
        await deleteStorageImageIfAny(selectedPopup.imagePath); // ✅ ADDED
        imageUrl = ''; // ✅ ADDED
        imagePath = ''; // ✅ ADDED
      }

      // If new image selected, upload and replace old file
      if (imageFile) {
        // delete old storage file first to avoid orphan files
        await deleteStorageImageIfAny(selectedPopup.imagePath); // ✅ ADDED

        try {
          const uploaded = await uploadImage(imageFile); // ✅ UPDATED
          imageUrl = uploaded.url; // ✅ ADDED
          imagePath = uploaded.path; // ✅ ADDED
        } catch (uploadError) {
          console.error("Image upload failed during update:", uploadError);
          setError('Failed to upload image. Please try again.');
          setIsSubmitting(false);
          return;
        }
      }

      const startTimestamp = new Date(startDate).getTime();
      const endTimestamp = new Date(endDate).getTime();

      const popupData = {
        title,
        description,
        imageUrl: imageUrl || '', // ✅ UPDATED (force empty string if removed)
        imagePath: imagePath || '', // ✅ ADDED
        active,
        startDate: startTimestamp,
        endDate: endTimestamp,
        updatedAt: Date.now()
      };

      const popupRef = dbRef(rtdb, `popups/${selectedPopup.id}`);
      await update(popupRef, popupData);

      const updatedPopup: PopupData = {
        ...selectedPopup,
        title,
        description,
        imageUrl: imageUrl || '', // ✅ UPDATED
        imagePath: imagePath || '', // ✅ ADDED
        active,
        startDate: new Date(startTimestamp),
        endDate: new Date(endTimestamp)
      };

      const updatedPopups = popups.map(popup =>
        popup.id === selectedPopup.id ? updatedPopup : popup
      );
      updatedPopups.sort((a, b) => b.startDate.getTime() - a.startDate.getTime());

      setPopups(updatedPopups);

      setIsEditDialogOpen(false);
      resetForm();
    } catch (error) {
      console.error('Error updating popup:', error);
      setError('Failed to update popup. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  // Delete popup (also delete image from storage)
  const handleDeletePopup = async (id: string) => {
    try {
      // read popup first to know imagePath
      const popupRef = dbRef(rtdb, `popups/${id}`); // ✅ UPDATED (store ref once)
      const snap = await get(popupRef); // ✅ ADDED

      if (snap.exists()) { // ✅ ADDED
        const data = snap.val();
        if (data?.imagePath) {
          await deleteStorageImageIfAny(data.imagePath); // ✅ ADDED
        }
      }

      await remove(popupRef);

      setPopups(popups.filter(popup => popup.id !== id));
    } catch (error) {
      console.error('Error deleting popup:', error);
      setError('Failed to delete popup. Please try again.');
    }
  };

  // Toggle popup active status
  const togglePopupActive = async (popup: PopupData) => {
    try {
      const popupRef = dbRef(rtdb, `popups/${popup.id}`);
      await update(popupRef, {
        active: !popup.active,
        updatedAt: serverTimestamp()
      });

      setPopups(popups.map(p =>
        p.id === popup.id ? { ...p, active: !p.active } : p
      ));
    } catch (error) {
      console.error('Error toggling popup status:', error);
      setError('Failed to update popup status. Please try again.');
    }
  };

  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold">Popup Manager</h2>
        <Dialog open={isAddDialogOpen} onOpenChange={setIsAddDialogOpen}>
          <DialogTrigger asChild>
            <Button className="bg-blue-600 hover:bg-blue-700">
              <Plus className="h-4 w-4 mr-2" />
              Add New Popup
            </Button>
          </DialogTrigger>
          <DialogContent className="bg-blue-950 border-blue-800 text-white">
            <DialogHeader>
              <DialogTitle>Add New Popup</DialogTitle>
              <DialogDescription className="text-blue-300">
                Create a new popup to display on the website
              </DialogDescription>
            </DialogHeader>
            <form onSubmit={handleAddPopup}>
              {error && (
                <div className="bg-red-900/50 border border-red-500/50 text-red-200 p-3 rounded-md mb-4">
                  {error}
                </div>
              )}
              <div className="grid gap-4 py-4">
                <div className="grid gap-2">
                  <Label htmlFor="title">Title</Label>
                  <Input
                    id="title"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    className="bg-blue-900/30 border-blue-700"
                  />
                </div>
                <div className="grid gap-2">
                  <Label htmlFor="description">Description</Label>
                  <Textarea
                    id="description"
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                    className="bg-blue-900/30 border-blue-700"
                  />
                </div>
                <div className="grid gap-2">
                  <Label htmlFor="image">Image</Label>
                  <div className="flex items-center gap-4">
                    <Input
                      id="image"
                      type="file"
                      accept="image/*"
                      onChange={handleImageChange}
                      className="bg-blue-900/30 border-blue-700"
                    />
                    {imagePreview && (
                      <div className="w-16 h-16 relative rounded overflow-hidden">
                        <img
                          src={imagePreview}
                          alt="Preview"
                          className="w-full h-full object-cover"
                        />
                      </div>
                    )}
                  </div>
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div className="grid gap-2">
                    <Label htmlFor="startDate">Start Date</Label>
                    <Input
                      id="startDate"
                      type="date"
                      value={startDate}
                      onChange={(e) => setStartDate(e.target.value)}
                      className="bg-blue-900/30 border-blue-700"
                    />
                  </div>
                  <div className="grid gap-2">
                    <Label htmlFor="endDate">End Date</Label>
                    <Input
                      id="endDate"
                      type="date"
                      value={endDate}
                      onChange={(e) => setEndDate(e.target.value)}
                      className="bg-blue-900/30 border-blue-700"
                    />
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <Switch
                    id="active"
                    checked={active}
                    onCheckedChange={setActive}
                  />
                  <Label htmlFor="active">Active</Label>
                </div>
              </div>
              <DialogFooter>
                <Button
                  type="button"
                  variant="outline"
                  onClick={() => {
                    resetForm();
                    setIsAddDialogOpen(false);
                  }}
                  className="border-blue-500 text-blue-300 hover:bg-blue-900/50"
                >
                  Cancel
                </Button>
                <Button
                  type="submit"
                  disabled={isSubmitting}
                  className="bg-blue-600 hover:bg-blue-700"
                >
                  {isSubmitting ? 'Saving...' : 'Save Popup'}
                </Button>
              </DialogFooter>
            </form>
          </DialogContent>
        </Dialog>
      </div>

      {/* Edit Popup Dialog */}
      <Dialog open={isEditDialogOpen} onOpenChange={setIsEditDialogOpen}>
        <DialogContent className="bg-blue-950 border-blue-800 text-white">
          <DialogHeader>
            <DialogTitle>Edit Popup</DialogTitle>
            <DialogDescription className="text-blue-300">
              Update the popup details
            </DialogDescription>
          </DialogHeader>
          <form onSubmit={handleUpdatePopup}>
            {error && (
              <div className="bg-red-900/50 border border-red-500/50 text-red-200 p-3 rounded-md mb-4">
                {error}
              </div>
            )}
            <div className="grid gap-4 py-4">
              <div className="grid gap-2">
                <Label htmlFor="edit-title">Title</Label>
                <Input
                  id="edit-title"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  className="bg-blue-900/30 border-blue-700"
                />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="edit-description">Description</Label>
                <Textarea
                  id="edit-description"
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  className="bg-blue-900/30 border-blue-700"
                />
              </div>

              <div className="grid gap-2">
                <Label htmlFor="edit-image">Image</Label>
                <div className="flex items-center gap-4">
                  <Input
                    id="edit-image"
                    type="file"
                    accept="image/*"
                    onChange={handleImageChange}
                    className="bg-blue-900/30 border-blue-700"
                  />

                  {imagePreview ? (
                    <div className="w-16 h-16 relative rounded overflow-hidden">
                      <img
                        src={imagePreview}
                        alt="Preview"
                        className="w-full h-full object-cover"
                      />
                    </div>
                  ) : (
                    <div className="text-blue-300 text-sm">No image</div> // ✅ ADDED
                  )}

                  <Button
                    type="button"
                    variant="outline"
                    onClick={() => {
                      setImageFile(null);
                      setImagePreview('');
                      setRemoveImage(true); // ✅ ADDED (marks removal)
                    }}
                    className="border-blue-500 text-blue-300 hover:bg-blue-900/50"
                  >
                    Remove Image {/* ✅ ADDED */}
                  </Button>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="grid gap-2">
                  <Label htmlFor="edit-startDate">Start Date</Label>
                  <Input
                    id="edit-startDate"
                    type="date"
                    value={startDate}
                    onChange={(e) => setStartDate(e.target.value)}
                    className="bg-blue-900/30 border-blue-700"
                  />
                </div>
                <div className="grid gap-2">
                  <Label htmlFor="edit-endDate">End Date</Label>
                  <Input
                    id="edit-endDate"
                    type="date"
                    value={endDate}
                    onChange={(e) => setEndDate(e.target.value)}
                    className="bg-blue-900/30 border-blue-700"
                  />
                </div>
              </div>
              <div className="flex items-center gap-2">
                <Switch
                  id="edit-active"
                  checked={active}
                  onCheckedChange={setActive}
                />
                <Label htmlFor="edit-active">Active</Label>
              </div>
            </div>
            <DialogFooter>
              <Button
                type="button"
                variant="outline"
                onClick={() => {
                  resetForm();
                  setIsEditDialogOpen(false);
                }}
                className="border-blue-500 text-blue-300 hover:bg-blue-900/50"
              >
                Cancel
              </Button>
              <Button
                type="submit"
                disabled={isSubmitting}
                className="bg-blue-600 hover:bg-blue-700"
              >
                {isSubmitting ? 'Updating...' : 'Update Popup'}
              </Button>
            </DialogFooter>
          </form>
        </DialogContent>
      </Dialog>

      {/* Popups List */}
      {loading ? (
        <div className="text-center py-8">
          <div className="inline-block h-8 w-8 animate-spin rounded-full border-4 border-solid border-blue-500 border-r-transparent"></div>
          <p className="mt-2 text-blue-300">Loading popups...</p>
        </div>
      ) : popups.length === 0 ? (
        <div className="text-center py-12 border border-dashed border-blue-800 rounded-lg">
          <ImageIcon className="h-12 w-12 mx-auto text-blue-700 opacity-50" />
          <h3 className="mt-4 text-xl font-medium text-blue-300">No popups found</h3>
          <p className="mt-2 text-blue-400/70">Create your first popup to display on the website</p>
          <Button
            className="mt-4 bg-blue-600 hover:bg-blue-700"
            onClick={() => setIsAddDialogOpen(true)}
          >
            <Plus className="h-4 w-4 mr-2" />
            Add Popup
          </Button>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {popups.map((popup) => (
            <Card key={popup.id} className="bg-blue-900/20 border-blue-800/50 overflow-hidden">
              <div className="h-40 relative">
                {popup.imageUrl ? ( // ✅ UPDATED
                  <img
                    src={popup.imageUrl}
                    alt={popup.title}
                    className="w-full h-full object-cover"
                  />
                ) : (
                  <div className="h-full flex items-center justify-center text-blue-300">
                    No image {/* ✅ ADDED */}
                  </div>
                )}

                <div className="absolute top-2 right-2">
                  <div className={`px-2 py-1 rounded-full text-xs font-medium ${popup.active ? 'bg-green-500/80 text-white' : 'bg-gray-500/80 text-gray-200'
                    }`}>
                    {popup.active ? 'Active' : 'Inactive'}
                  </div>
                </div>
              </div>
              <CardHeader>
                <CardTitle>{popup.title}</CardTitle>
                <CardDescription className="text-blue-300">
                  <div className="flex items-center">
                    <Calendar className="h-3 w-3 mr-1" />
                    {format(popup.startDate, 'MMM d, yyyy')} - {format(popup.endDate, 'MMM d, yyyy')}
                  </div>
                </CardDescription>
              </CardHeader>
              <CardContent>
                <p className="text-blue-100">{popup.description}</p>
              </CardContent>
              <CardFooter className="flex justify-between">
                <div className="flex items-center gap-2">
                  <Switch
                    id={`toggle-${popup.id}`}
                    checked={popup.active}
                    onCheckedChange={() => togglePopupActive(popup)}
                  />
                  <Label htmlFor={`toggle-${popup.id}`} className="text-sm">
                    {popup.active ? 'Active' : 'Inactive'}
                  </Label>
                </div>
                <div className="flex gap-2">
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => handleEditPopup(popup)}
                    className="border-blue-500 text-blue-300 hover:bg-blue-900/50"
                  >
                    <Edit className="h-4 w-4 mr-1" />
                    Edit
                  </Button>
                  <AlertDialog>
                    <AlertDialogTrigger asChild>
                      <Button
                        variant="destructive"
                        size="sm"
                        className="bg-red-900/50 hover:bg-red-800 text-red-200 border-red-700/50"
                      >
                        <Trash2 className="h-4 w-4 mr-1" />
                        Delete
                      </Button>
                    </AlertDialogTrigger>
                    <AlertDialogContent className="bg-blue-950 border-blue-800 text-white">
                      <AlertDialogHeader>
                        <AlertDialogTitle>Are you sure?</AlertDialogTitle>
                        <AlertDialogDescription className="text-blue-300">
                          This will permanently delete the popup "{popup.title}".
                          This action cannot be undone.
                        </AlertDialogDescription>
                      </AlertDialogHeader>
                      <AlertDialogFooter>
                        <AlertDialogCancel className="border-blue-500 text-blue-300 hover:bg-blue-900/50">
                          Cancel
                        </AlertDialogCancel>
                        <AlertDialogAction
                          onClick={() => handleDeletePopup(popup.id)}
                          className="bg-red-600 hover:bg-red-700 text-white"
                        >
                          Delete
                        </AlertDialogAction>
                      </AlertDialogFooter>
                    </AlertDialogContent>
                  </AlertDialog>
                </div>
              </CardFooter>
            </Card>
          ))}
        </div>
      )}
    </div>
  );
};

export default PopupManager;