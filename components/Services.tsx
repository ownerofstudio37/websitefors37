'use client'

import React, { useEffect, useState, useRef } from 'react'
import Link from 'next/link'
import { useGalleryImages } from '@/hooks/useGalleryImages'
import { Camera, Users, Building, Heart, Megaphone, ArrowRight } from 'lucide-react'
import OptimizedImage from './OptimizedImage'

const services = [
		{
			icon: Heart,
			title: 'Wedding Photography',
			startingPrice: 'Starting at $1,200',
			description:
				'Capture your special day with romantic and timeless images that tell your love story.',
			features: [
				'Full day coverage',
				'Engagement session',
				'Digital gallery',
				'Print options',
			],
			category: 'wedding',
			slug: 'wedding-photography',
			image: 'https://res.cloudinary.com/dmjxho2rl/image/upload/v1769255715/PS374317_mqqiyv.jpg',
		},
		{
			icon: Users,
			title: 'Portrait Sessions',
			startingPrice: 'Starting at $350',
			description:
				'Professional headshots, family portraits, and individual sessions in studio or on location.',
			features: [
				'Studio or outdoor',
				'Multiple outfits',
				'Retouched images',
				'Same day preview',
			],
			category: 'professional portraits',
			slug: 'portrait-photography',
			image: 'https://res.cloudinary.com/dmjxho2rl/image/upload/v1769255713/D9E4E5AE-12BE-498B-B7C1-9CDE7FFC1B59_qiaj3v.jpg',
		},
		{
			icon: Camera,
			title: 'Event Photography',
			startingPrice: 'Starting at $600',
			description:
				'Document your corporate events, parties, and celebrations with candid and posed shots.',
			features: [
				'Event coverage',
				'Candid moments',
				'Group photos',
				'Quick turnaround',
			],
			category: 'event',
			slug: 'event-photography',
			image: 'https://res.cloudinary.com/dmjxho2rl/image/upload/v1769255711/PS372952_gkvxjl.jpg',
		},
		{
			icon: Building,
			title: 'Commercial Photography',
			startingPrice: 'Starting at $500',
			description:
				'Brand imagery, product photography, and business content captured by our Two-Pro Production Team — more coverage, same rate.',
			features: [
				'Product shots',
				'Brand imagery',
				'Marketing content',
				'Commercial rights',
			],
			category: 'product photography',
			slug: 'commercial-photography',
			image: 'https://res.cloudinary.com/dmjxho2rl/image/upload/v1769255706/PS373287_d7fl9k.jpg',
		},
		{
			icon: Megaphone,
			title: 'Branding & Marketing',
			startingPrice: 'White-glove retainers',
			description:
				'Full-service growth support including brand content, web development, SEO, PPC, and social media management.',
			features: [
				'Brand content + video',
				'Website & landing pages',
				'SEO + PPC management',
				'Social media growth',
			],
			category: 'branding marketing',
			slug: 'branding-marketing',
			image: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=800&h=600&fit=crop',
		},
]

export default function Services() {
	const [imagesByCategory, setImagesByCategory] = useState<Record<string, any[]>>({})
	const [slideshowIndexes, setSlideshowIndexes] = useState<Record<string, number>>({})
	const intervalRef = useRef<NodeJS.Timeout | null>(null)

	const categories = services.map(s => s.category)
	const { data: images } = useGalleryImages({
		categories,
		featured: true,
		orderBy: 'display_order',
		ascending: true,
	})

	useEffect(() => {
		if (!images) return
		const grouped: Record<string, any[]> = {}
		categories.forEach(cat => {
			grouped[cat] = images.filter(img => img.category === cat)
		})
		setImagesByCategory(grouped)
	}, [images])

	// Slideshow rotation for each category
	useEffect(() => {
		intervalRef.current = setInterval(() => {
			setSlideshowIndexes(prev => {
				const next: Record<string, number> = { ...prev }
				Object.keys(imagesByCategory).forEach(cat => {
					const arr = imagesByCategory[cat] || []
					if (arr.length > 1) {
						next[cat] = ((prev[cat] || 0) + 1) % arr.length
					}
				})
				return next
			})
		}, 5000)
		return () => {
			if (intervalRef.current) clearInterval(intervalRef.current)
		}
	}, [imagesByCategory])

	return (
		<section className="section-shell bg-stone-50">
			<div className="container mx-auto px-4">
				<div className="text-center mb-14 max-w-3xl mx-auto">
					<div className="eyebrow mb-4">Services</div>
					<h2 className="text-4xl md:text-5xl font-bold mb-4 text-stone-950">
						Our Photography Services
					</h2>
					<p className="text-lg md:text-xl text-stone-600 max-w-2xl mx-auto leading-relaxed">
						From intimate portraits to grand celebrations, we offer
						comprehensive photography services tailored to your unique
						needs.
					</p>
				</div>

				<div
					className="grid md:grid-cols-2 xl:grid-cols-3 gap-6 xl:gap-8"
					style={{ contain: 'layout style paint' }}
				>
					{services.map((service, index) => {
						const Icon = service.icon
						return (
							<Link
								key={service.title}
								href={`/services/${service.slug}`}
								className="group block"
							>
								<div
									className="surface-panel p-5 md:p-6 h-full flex flex-col cursor-pointer transition-all duration-300 group-hover:-translate-y-1 group-hover:shadow-[0_18px_50px_rgba(15,23,42,0.12)]"
								>
									<div className="flex items-center justify-center w-14 h-14 bg-amber-50 rounded-2xl mb-5 group-hover:bg-amber-700 transition-all duration-300">
										<Icon className="h-8 w-8 text-primary-600 group-hover:text-white transition-colors duration-300" />
									</div>

					{/* Static service image - optimized for performance */}
				<div className="mb-5 aspect-[4/3] relative rounded-2xl overflow-hidden bg-stone-200 w-full">
					<OptimizedImage
						src={service.image}
						alt={service.title}
						fill
						className="!relative w-full h-full"
						imgClassName="object-cover group-hover:scale-105 transition-transform duration-500"
						priority={index < 2}
						quality={70}
						sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 25vw"
						/>
					</div>
					<h3 className="text-2xl font-semibold mb-1 text-left group-hover:text-primary-700 transition-colors duration-300">
						{service.title}
					</h3>
					<p className="text-left text-sm font-semibold text-primary-700 mb-3">
						{service.startingPrice}
					</p>
									<p className="text-stone-600 mb-5 text-left flex-grow leading-relaxed">
										{service.description}
									</p>

									<ul className="space-y-2.5 mb-6 border-t border-stone-100 pt-5">
										{service.features.map((feature) => (
											<li
												key={feature}
												className="flex items-center text-sm text-stone-700"
											>
												<div className="w-2 h-2 bg-amber-600 rounded-full mr-3 group-hover:scale-125 transition-transform duration-300"></div>
												{feature}
											</li>
										))}
									</ul>

									<div className="flex items-center text-primary-700 font-semibold text-sm group-hover:text-primary-800 mt-auto">
										Learn More
										<ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform duration-300" />
									</div>
								</div>
							</Link>
						)
					})}
				</div>
			</div>
			<style jsx>{`
				@keyframes fade-in-up {
					from {
						opacity: 0;
						transform: translateY(30px);
					}
					to {
						opacity: 1;
						transform: translateY(0);
					}
				}
				.animate-fade-in-up {
					animation: fade-in-up 0.5s ease-out forwards;
					opacity: 0;
				}
			`}</style>
		</section>
	)
}
