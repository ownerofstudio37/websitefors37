'use client'

import React from 'react'
import Link from 'next/link'
import { Camera, Users, Building, Heart, Megaphone, ArrowRight, HeartHandshake } from 'lucide-react'
import OptimizedImage from './OptimizedImage'

const services = [
		{
			icon: Heart,
			title: 'Wedding Photography',
			startingPrice: 'Starting at $1,200',
			description:
				'Timeline-aware wedding coverage with two photographers, family-formal planning, and sneak peeks built into the delivery rhythm.',
			features: [
				'Full day coverage',
				'Engagement session',
				'Digital gallery',
				'Print options',
			],
			category: 'wedding',
			slug: 'wedding-photography',
			image: 'https://res.cloudinary.com/dmjxho2rl/image/upload/v1779268256/Untitled-30_fliqiq.jpg',
		},
		{
			icon: Users,
			title: 'Portrait Sessions',
			startingPrice: 'Starting at $350',
			description:
				'Directed family, senior, maternity, and headshot sessions with wardrobe guidance, location planning, and polished private galleries.',
			features: [
				'Studio or outdoor',
				'Multiple outfits',
				'Retouched images',
				'Fast gallery delivery',
			],
			category: 'professional portraits',
			slug: 'portrait-photography',
			image: 'https://res.cloudinary.com/dmjxho2rl/image/upload/v1779268257/PS375315_zyvbbi.jpg',
		},
		{
			icon: HeartHandshake,
			title: 'Engagement Concierge',
			startingPrice: 'Custom pricing · Consultation required',
			description:
				'Luxury engagement and proposal planning with location scouting, decor coordination, surprise logistics, and photo/video coverage.',
			features: [
				'Proposal planning concierge',
				'Location + decor coordination',
				'Photo + video options',
				'Book consultation to customize',
			],
			category: 'engagement concierge',
			slug: 'concierge-services',
			image: 'https://res.cloudinary.com/dmjxho2rl/image/upload/v1778033152/IMG_4555_1_ppdkum.jpg',
		},
		{
			icon: Camera,
			title: 'Event Photography',
			startingPrice: 'Starting at $600',
			description:
				'Run-of-show coverage for parties, corporate programs, and milestones with quick highlight delivery for sharing and promotion.',
			features: [
				'Event coverage',
				'Candid moments',
				'Group photos',
				'Quick turnaround',
			],
			category: 'event',
			slug: 'event-photography',
			image: 'https://res.cloudinary.com/dmjxho2rl/image/upload/v1778033087/IMG_4591_1_r62hly.jpg',
		},
		{
			icon: Building,
			title: 'Commercial Photography',
			startingPrice: 'Starting at $500',
			description:
				'Brand, product, workplace, and campaign images planned around actual usage: web, ads, profiles, listings, and social content.',
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
			image: 'https://res.cloudinary.com/dmjxho2rl/image/upload/v1781169103/carlos-muza-hpjSkU2UYSU-unsplash_ploflu.jpg',
		},
]

export default function Services() {
	return (
		<section className="section-shell bg-stone-50">
			<div className="container mx-auto px-4">
				<div className="text-center mb-14 max-w-3xl mx-auto">
					<div className="eyebrow mb-4">Services</div>
					<h2 className="text-4xl md:text-5xl font-bold mb-4 text-stone-950">
						Our Photography Services
					</h2>
					<p className="text-lg md:text-xl text-stone-600 max-w-2xl mx-auto leading-relaxed">
						Choose a service first, compare the package fit, then book with the right context already in place.
					</p>
				</div>

				<div
					className="grid md:grid-cols-2 xl:grid-cols-3 gap-6 xl:gap-8"
					style={{ contain: 'layout style paint' }}
				>
					{services.map((service, index) => {
						const Icon = service.icon
						return (
							<div
								key={service.title}
								className="group block"
							>
								<div
									className="surface-panel p-5 md:p-6 h-full flex flex-col transition-all duration-300 group-hover:-translate-y-1 group-hover:shadow-[0_18px_50px_rgba(15,23,42,0.12)]"
								>
									<div className="flex items-center justify-center w-14 h-14 bg-amber-50 rounded-2xl mb-5 group-hover:bg-amber-700 transition-all duration-300">
										<Icon className="h-8 w-8 text-primary-600 group-hover:text-white transition-colors duration-300" />
									</div>

									{/* Static service image - optimized for performance */}
									<Link
										href={`/services/${service.slug}`}
										aria-label={`View ${service.title}`}
										className="mb-5 block aspect-[4/3] relative rounded-2xl overflow-hidden bg-stone-200 w-full focus:outline-none focus:ring-2 focus:ring-amber-600 focus:ring-offset-2"
									>
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
									</Link>
									<h3 className="text-2xl font-semibold mb-1 text-left group-hover:text-primary-700 transition-colors duration-300">
										<Link
											href={`/services/${service.slug}`}
											className="rounded-sm focus:outline-none focus:ring-2 focus:ring-amber-600 focus:ring-offset-2"
										>
											{service.title}
										</Link>
									</h3>
									<p className="text-left text-sm font-semibold text-primary-700 mb-3">
										{service.startingPrice}
									</p>
									<p className="mb-4 rounded-lg bg-amber-50 px-3 py-2 text-left text-xs leading-5 text-amber-900">
										Best next step: view the service details, then use the package tool if you are comparing options.
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

									<div className="mt-auto flex flex-col gap-3 border-t border-stone-100 pt-5">
										<Link href={`/services/${service.slug}`} className="btn-primary w-full text-sm">
											View Service Details
											<ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform duration-300" />
										</Link>
										<div className="grid grid-cols-2 gap-2">
											<Link
												href="/tools/package-recommender"
												className="rounded-lg border border-stone-200 px-3 py-2 text-center text-xs font-semibold text-stone-800 hover:border-amber-300 hover:text-amber-800"
											>
												Find fit
											</Link>
											<Link
												href="/tools/pricing"
												className="rounded-lg border border-stone-200 px-3 py-2 text-center text-xs font-semibold text-stone-800 hover:border-amber-300 hover:text-amber-800"
											>
												Price it
											</Link>
										</div>
									</div>
								</div>
							</div>
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
