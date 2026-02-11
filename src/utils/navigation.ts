/**
 * Navigation utilities to handle consistent navigation across the application
 * Provides fallback mechanisms and error handling for navigation issues
 */

import { NavigateFunction } from 'react-router-dom';

/**
 * Safe navigation function that handles errors gracefully
 * @param navigate - React Router navigate function
 * @param path - Path to navigate to
 * @param options - Navigation options
 */
export const safeNavigate = (
  navigate: NavigateFunction, 
  path: string, 
  options?: { replace?: boolean; state?: any }
) => {
  try {
    navigate(path, options);
  } catch (error) {
    console.error("Navigation error:", error);
    // Fallback to window.location if navigate fails
    if (options?.replace) {
      window.location.replace(path);
    } else {
      window.location.href = path;
    }
  }
};

/**
 * Safe external link opener with error handling
 * @param url - URL to open
 * @param target - Target window (default: '_blank')
 */
export const safeOpenExternal = (url: string, target: string = '_blank') => {
  try {
    window.open(url, target);
  } catch (error) {
    console.error("Error opening external link:", error);
    // Fallback to direct navigation
    window.location.href = url;
  }
};

/**
 * Safe scroll to element with error handling
 * @param elementId - ID of element to scroll to
 * @param behavior - Scroll behavior (default: 'smooth')
 * @param block - Scroll block position (default: 'start')
 */
export const safeScrollToElement = (
  elementId: string, 
  behavior: ScrollBehavior = 'smooth',
  block: ScrollLogicalPosition = 'start'
) => {
  try {
    const element = document.getElementById(elementId);
    if (element) {
      element.scrollIntoView({ behavior, block });
      return true;
    }
    return false;
  } catch (error) {
    console.error("Error scrolling to element:", error);
    return false;
  }
};

/**
 * Safe scroll to top with error handling
 * @param behavior - Scroll behavior (default: 'smooth')
 */
export const safeScrollToTop = (behavior: ScrollBehavior = 'smooth') => {
  try {
    window.scrollTo({
      top: 0,
      behavior
    });
  } catch (error) {
    console.error("Error scrolling to top:", error);
    // Fallback to instant scroll
    window.scrollTo(0, 0);
  }
};

/**
 * Parse URL parameters safely
 * @param search - URL search string
 * @returns Object with parsed parameters
 */
export const safeParseURLParams = (search: string): Record<string, string> => {
  try {
    const params = new URLSearchParams(search);
    const result: Record<string, string> = {};
    params.forEach((value, key) => {
      result[key] = value;
    });
    return result;
  } catch (error) {
    console.error("Error parsing URL parameters:", error);
    return {};
  }
};

/**
 * Update URL parameters safely
 * @param navigate - React Router navigate function
 * @param params - Parameters to update
 * @param options - Navigation options
 */
export const safeUpdateURLParams = (
  navigate: NavigateFunction,
  params: Record<string, string>,
  options?: { replace?: boolean }
) => {
  try {
    const searchParams = new URLSearchParams();
    Object.entries(params).forEach(([key, value]) => {
      if (value) {
        searchParams.set(key, value);
      }
    });
    
    const search = searchParams.toString();
    const path = search ? `?${search}` : '';
    
    navigate(path, { replace: options?.replace ?? true });
  } catch (error) {
    console.error("Error updating URL parameters:", error);
  }
};

/**
 * Validate navigation parameters
 * @param value - Value to validate
 * @param allowedValues - Array of allowed values
 * @returns True if valid, false otherwise
 */
export const validateNavParam = (value: string | null, allowedValues: string[]): boolean => {
  return value !== null && allowedValues.includes(value);
};

/**
 * Handle product details navigation with error handling
 * @param navigate - React Router navigate function
 * @param productType - Product type to navigate to
 * @param setters - State setter functions
 */
export const handleProductDetailsNavigation = (
  navigate: NavigateFunction,
  productType: string,
  setters: {
    setActiveProductType: (type: string) => void;
    setActiveTab: (tab: string) => void;
    setActiveDetailTab: (tab: string) => void;
  }
) => {
  try {
    // Set the states for direct navigation to product details
    setters.setActiveProductType(productType);
    setters.setActiveTab('details');
    setters.setActiveDetailTab('features');

    // Update URL parameters
    safeUpdateURLParams(navigate, {
      tab: 'details',
      product: productType,
      detailTab: 'features'
    });

    // Scroll to product details section after state update
    setTimeout(() => {
      safeScrollToElement('product-detail-section');
    }, 100);
  } catch (error) {
    console.error("Error in handleProductDetailsNavigation:", error);
    // Fallback - just set the states without URL manipulation
    setters.setActiveProductType(productType);
    setters.setActiveTab('details');
    setters.setActiveDetailTab('features');
  }
};
