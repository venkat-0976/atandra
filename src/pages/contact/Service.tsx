"use client";

import PageLayout from "@/components/layout/PageLayout";
import SeoHead from '@/seo/SeoHead';
import { useEffect } from "react";

const Service = () => {
	const externalUrl = "http://krykardcare.in/support/#/main";

	useEffect(() => {
		try {
			window.open(externalUrl, "_blank", "noopener,noreferrer");
		} catch (err) {
			// noop
		}
	}, []);

	return (
		<>
			<SeoHead
				title="Service & Support | Atandra Energy"
				description="Get technical support and service for KRYKARD products. Contact our service team for installations, maintenance and troubleshooting."
				keywords="KRYKARD service, technical support, product maintenance, service centers, installation support, troubleshooting, Atandra Energy service"
				canonical="https://atandra.in/contact/service"
			/>
			<PageLayout category="contact" hideHero={true}>
				<div className="min-h-screen flex items-center justify-center p-6">
					<div className="text-center max-w-2xl">
						<h1 className="text-3xl font-bold mb-4 text-gray-900">Redirecting to Service Portal...</h1>
						<p className="text-gray-600 mb-6 text-lg">
							You are being redirected to our service and support portal for technical assistance,
							product maintenance, and service requests.
						</p>
						<p className="text-gray-600 mb-6">
							If you are not redirected automatically,
							<a
								href={externalUrl}
								target="_blank"
								rel="noopener noreferrer"
								className="text-blue-600 hover:underline ml-1 font-medium"
							>
								click here to access the service portal
							</a>
						</p>
						<div className="mt-8 p-4 bg-blue-50 rounded-lg">
							<p className="text-sm text-gray-700">
								<strong>Need immediate assistance?</strong> Contact our service team at your nearest service center.
								We have 100+ service centers across India ready to help you.
							</p>
						</div>
					</div>
				</div>
			</PageLayout>
		</>
	);
};

export default Service;