'use client'

import React, { useEffect, useRef, useState } from 'react'
import { Star, Quote } from 'lucide-react'

const testimonials = [
	// Thumbtack Reviews
	{
		id: 1,
		name: 'Astini S.',
		service: 'Portrait Photography',
		rating: 5,
		text: 'Working with Catie and Christian was such a wonderful experience. They are the kindest couple, and we clicked with them right away. Despite our shoot being very last minute, they were incredibly flexible and accommodating. They truly listened to what we wanted and made the whole experience relaxed and fun. We\'re so excited to see the final photos.',
		image: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=100&h=100&fit=crop&crop=face',
		source: 'Thumbtack',
		sourceUrl: 'https://www.thumbtack.com/tx/pinehurst/event-photographers/studio-37/service/552295631777284097'
	},
	{
		id: 2,
		name: 'Kelsi R.',
		service: 'Portrait Photography',
		rating: 5,
		text: 'Christian and Caitie were incredible to work with! They captured beautiful generational photos of our family with so much care. They were flexible when we had cancellations with other vendors and took the time to bring our vision to life. Highly recommend!',
		image: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=100&h=100&fit=crop&crop=face',
		source: 'Thumbtack',
		sourceUrl: 'https://www.thumbtack.com/tx/pinehurst/event-photographers/studio-37/service/552295631777284097'
	},
	{
		id: 3,
		name: 'Deborah B.',
		service: 'Portrait Photography',
		rating: 5,
		text: 'Very impressive team work. They guided us through the session and it felt flawless. I will use this company again.',
		image: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=100&h=100&fit=crop&crop=face',
		source: 'Thumbtack',
		sourceUrl: 'https://www.thumbtack.com/tx/pinehurst/event-photographers/studio-37/service/552295631777284097'
	},
	{
		id: 4,
		name: 'Bate I.',
		service: 'Portrait Photography',
		rating: 5,
		text: 'They were absolutely amazing! Gave us much more value than we imagined and definitely more than what we paid for. Made the photoshoot a wonderful experience for the whole family. We would use them again.',
		image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&h=100&fit=crop&crop=face',
		source: 'Thumbtack',
		sourceUrl: 'https://www.thumbtack.com/tx/pinehurst/event-photographers/studio-37/service/552295631777284097'
	},
	{
		id: 5,
		name: 'Jade B.',
		service: 'Family or Children\'s Portrait',
		rating: 5,
		text: 'Christian at Studio 37 responded promptly and with exceptional customer service! I am looking forward to booking with him in the future.',
		image: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=100&h=100&fit=crop&crop=face',
		source: 'Thumbtack',
		sourceUrl: 'https://www.thumbtack.com/tx/pinehurst/event-photographers/studio-37/service/552295631777284097'
	},
	{
		id: 6,
		name: 'Mansher G.',
		service: 'Portrait Photography',
		rating: 5,
		text: 'This was our first time doing a family shoot, and the folks over at Studio 37 nailed it! They worked with us on short notice, brought lighting and other equipment to help us get the best-quality shots, and made the experience very seamless. I definitely intend to work with them again on future family shoots.',
		image: 'https://images.unsplash.com/photo-1506683333227-59290aa7a0f0?w=100&h=100&fit=crop&crop=face',
		source: 'Thumbtack',
		sourceUrl: 'https://www.thumbtack.com/tx/pinehurst/event-photographers/studio-37/service/552295631777284097'
	},
	{
		id: 7,
		name: 'Lane G.',
		service: 'Professional Headshot',
		rating: 5,
		text: 'Great and enjoyable time. Very responsive to our wants and needs. They really took the time to get to know us and what we were looking for. Also brought their own ideas to the table that helped us create our vision.',
		image: 'https://images.unsplash.com/photo-1507539803528-65805bbb0ca9?w=100&h=100&fit=crop&crop=face',
		source: 'Thumbtack',
		sourceUrl: 'https://www.thumbtack.com/tx/pinehurst/event-photographers/studio-37/service/552295631777284097'
	},
	{
		id: 8,
		name: 'Ally F.',
		service: 'Family or Children\'s Portrait',
		rating: 5,
		text: 'Wonderful experience! Catie and Christian were so nice and easy to work with. :)',
		image: 'https://images.unsplash.com/photo-1519915212116-7cfef71f0d2e?w=100&h=100&fit=crop&crop=face',
		source: 'Thumbtack',
		sourceUrl: 'https://www.thumbtack.com/tx/pinehurst/event-photographers/studio-37/service/552295631777284097'
	},
	{
		id: 9,
		name: 'Ese O.',
		service: 'Family or Children\'s Portrait',
		rating: 5,
		text: 'They were able to distract my 2 little ones and even expedited the delivery of the pictures. Pictures turned out great.',
		image: 'https://images.unsplash.com/photo-1519046904884-53103b34b206?w=100&h=100&fit=crop&crop=face',
		source: 'Thumbtack',
		sourceUrl: 'https://www.thumbtack.com/tx/pinehurst/event-photographers/studio-37/service/552295631777284097'
	},
	{
		id: 10,
		name: 'Alexandra S.',
		service: 'Family Milestones',
		rating: 5,
		text: 'Working with Caitie has been such an amazing experience! We\'ve used Studio 37 for a lot of our family milestones and they never disappoint. They\'re easy to work with and I could also count on them for a quick response. She\'s also GREAT with getting the best pictures of my toddlers and making it fun for everyone!',
		image: 'https://images.unsplash.com/photo-1510228240019-c15931d9b611?w=100&h=100&fit=crop&crop=face',
		source: 'Thumbtack',
		sourceUrl: 'https://www.thumbtack.com/tx/pinehurst/event-photographers/studio-37/service/552295631777284097'
	},
	{
		id: 11,
		name: 'David V.',
		service: 'Marketing/Corporate Photography',
		rating: 5,
		text: 'You couldn\'t ask for a more dedicated team. I would recommend them 100 times over.',
		image: 'https://images.unsplash.com/photo-1513258917313-52581002a659?w=100&h=100&fit=crop&crop=face',
		source: 'Thumbtack',
		sourceUrl: 'https://www.thumbtack.com/tx/pinehurst/event-photographers/studio-37/service/552295631777284097'
	},
	
	// Google Reviews
	{
		id: 12,
		name: 'Ivana Moore',
		service: 'Professional Photography',
		rating: 5,
		text: 'My experience working with studio 37 namely Christian and Catie was fantastic! Both Christian and Catie were pleasure to work with, they are genuine, competent, solid, creative, and professional individuals. I hired them for shots for my private business website. Everything went smooth I found Christian and Catie in tune throughout the process with each other and with the namely, adapting and creating the relaxed atmosphere making me feel at ease and I had a lot of fun getting my pictures taken. The photo shoot took place at my house and that was an added bonus. It was truly a privilege and pleasure to get to know them and do business with them I am grateful to have found them and excited to book again, with different photo shoot setting, soon.',
		image: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=100&h=100&fit=crop&crop=face',
		source: 'Google',
		sourceUrl: 'https://share.google/QzdIYuD9QZX4CMgUk'
	},
	{
		id: 13,
		name: 'Joshua Green',
		service: 'Professional Photography',
		rating: 5,
		text: 'Christian and his partner were both great in getting the shots and angles I wanted. They were very easy to work with and speak to when it came to grabbing the image I wanted. They definitely go above and beyond to get you the pictures you need, and even some you didn\'t realize you wanted! Definitely recommend them if you\'re wanting perfectly crafted and memorable photos.',
		image: 'https://images.unsplash.com/photo-1507539803528-65805bbb0ca9?w=100&h=100&fit=crop&crop=face',
		source: 'Google',
		sourceUrl: 'https://share.google/QzdIYuD9QZX4CMgUk'
	},
	{
		id: 14,
		name: 'Kolton Kidd',
		service: 'Family Portraits',
		rating: 5,
		text: 'Christian and the Studio37 team were amazing to work with for our family portraits! We chose the outdoor on-location setup, and the images are stunning—truly professional quality. The dual-photographer approach meant we got candid moments and beautifully posed shots all at once. The process was smooth, and the prints we ordered were absolutely perfect. Highly recommend!',
		image: 'https://images.unsplash.com/photo-1506683333227-59290aa7a0f0?w=100&h=100&fit=crop&crop=face',
		source: 'Google',
		sourceUrl: 'https://share.google/QzdIYuD9QZX4CMgUk'
	},
	{
		id: 15,
		name: 'Kelsi Rankins',
		service: 'Generational Family Photos',
		rating: 5,
		text: 'Studio 37 were incredible to work with! They captured beautiful generational photos of our family with so much care. They were flexible when we had cancellations with other vendors and took the time to bring our vision to life. Highly recommend!',
		image: 'https://images.unsplash.com/photo-1519915212116-7cfef71f0d2e?w=100&h=100&fit=crop&crop=face',
		source: 'Google',
		sourceUrl: 'https://share.google/QzdIYuD9QZX4CMgUk'
	{
		id: 5,
		name: 'Jade B.',
		service: 'Family or Children\'s Portrait',
		rating: 5,
		text: 'Christian at Studio 37 responded promptly and with exceptional customer service! I am looking forward to booking with him in the future.',
		image: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=100&h=100&fit=crop&crop=face',
		source: 'Thumbtack',
		sourceUrl: 'https://www.thumbtack.com/tx/pinehurst/event-photographers/studio-37/service/552295631777284097'
	},
	{
		id: 6,
		name: 'Mansher G.',
		service: 'Portrait Photography',
		rating: 5,
		text: 'This was our first time doing a family shoot, and the folks over at Studio 37 nailed it! They worked with us on short notice, brought lighting and other equipment to help us get the best-quality shots, and made the experience very seamless. I definitely intend to work with them again on future family shoots.',
		image: 'https://images.unsplash.com/photo-1506683333227-59290aa7a0f0?w=100&h=100&fit=crop&crop=face',
		source: 'Thumbtack',
		sourceUrl: 'https://www.thumbtack.com/tx/pinehurst/event-photographers/studio-37/service/552295631777284097'
	},
	{
		id: 7,
		name: 'Lane G.',
		service: 'Professional Headshot',
		rating: 5,
		text: 'Great and enjoyable time. Very responsive to our wants and needs. They really took the time to get to know us and what we were looking for. Also brought their own ideas to the table that helped us create our vision.',
		image: 'https://images.unsplash.com/photo-1507539803528-65805bbb0ca9?w=100&h=100&fit=crop&crop=face',
		source: 'Thumbtack',
		sourceUrl: 'https://www.thumbtack.com/tx/pinehurst/event-photographers/studio-37/service/552295631777284097'
	},
	{
		id: 8,
		name: 'Ally F.',
		service: 'Family or Children\'s Portrait',
		rating: 5,
		text: 'Wonderful experience! Catie and Christian were so nice and easy to work with. :)',
		image: 'https://images.unsplash.com/photo-1519915212116-7cfef71f0d2e?w=100&h=100&fit=crop&crop=face',
		source: 'Thumbtack',
		sourceUrl: 'https://www.thumbtack.com/tx/pinehurst/event-photographers/studio-37/service/552295631777284097'
	},
	{
		id: 9,
		name: 'Ese O.',
		service: 'Family or Children\'s Portrait',
		rating: 5,
		text: 'They were able to distract my 2 little ones and even expedited the delivery of the pictures. Pictures turned out great.',
		image: 'https://images.unsplash.com/photo-1519046904884-53103b34b206?w=100&h=100&fit=crop&crop=face',
		source: 'Thumbtack',
		sourceUrl: 'https://www.thumbtack.com/tx/pinehurst/event-photographers/studio-37/service/552295631777284097'
	},
	{
		id: 10,
		name: 'Alexandra S.',
		service: 'Family Milestones',
		rating: 5,
		text: 'Working with Caitie has been such an amazing experience! We\'ve used Studio 37 for a lot of our family milestones and they never disappoint. They\'re easy to work with and I could also count on them for a quick response. She\'s also GREAT with getting the best pictures of my toddlers and making it fun for everyone!',
		image: 'https://images.unsplash.com/photo-1510228240019-c15931d9b611?w=100&h=100&fit=crop&crop=face',
		source: 'Thumbtack',
		sourceUrl: 'https://www.thumbtack.com/tx/pinehurst/event-photographers/studio-37/service/552295631777284097'
	},
	{
		id: 11,
		name: 'David V.',
		service: 'Marketing/Corporate Photography',
		rating: 5,
		text: 'You couldn\'t ask for a more dedicated team. I would recommend them 100 times over.',
		image: 'https://images.unsplash.com/photo-1513258917313-52581002a659?w=100&h=100&fit=crop&crop=face',
		source: 'Thumbtack',
		sourceUrl: 'https://www.thumbtack.com/tx/pinehurst/event-photographers/studio-37/service/552295631777284097'
	}
]

export default function Testimonials() {
	const [visibleItems, setVisibleItems] = useState<Set<number>>(new Set())
	const observerRef = useRef<IntersectionObserver | null>(null)

	useEffect(() => {
		observerRef.current = new IntersectionObserver(
			(entries) => {
				entries.forEach((entry) => {
					if (entry.isIntersecting) {
						const index = parseInt(entry.target.getAttribute('data-index') || '0')
						setVisibleItems((prev) => new Set(prev).add(index))
					}
				})
			},
			{ threshold: 0.1, rootMargin: '50px' }
		)

		const items = document.querySelectorAll('.testimonial-item')
		items.forEach((item) => observerRef.current?.observe(item))

		return () => observerRef.current?.disconnect()
	}, [])

	return (
		<section className="py-20 bg-white">
			<div className="container mx-auto px-4">
				<div className="text-center mb-16">
					<h2 className="text-4xl font-bold mb-4">What Our Clients Say</h2>
					<p className="text-xl text-gray-600 max-w-2xl mx-auto">
						Don&apos;t just take our word for it. Here&apos;s what our satisfied clients have to say about their experience with Studio 37.
					</p>
				</div>

				<div
					className="grid md:grid-cols-3 gap-8"
					style={{ contain: 'layout style paint', contentVisibility: 'auto', containIntrinsicSize: '800px' as any }}
				>
					{testimonials.map((testimonial, index) => (
						<div
							key={testimonial.id}
							data-index={index}
							className={`testimonial-item bg-gray-50 p-8 rounded-lg relative transition-all duration-500 ${
								visibleItems.has(index) ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
							}`}
							style={{ transitionDelay: `${index * 100}ms` }}
						>
							<Quote className="h-8 w-8 text-primary-500 mb-4" />
							
							<div className="flex mb-4" aria-label={`Rated ${testimonial.rating} out of 5`} role="img">
								{[...Array(testimonial.rating)].map((_, i) => (
									<Star key={i} className="h-5 w-5 text-yellow-400 fill-current" aria-hidden="true" />
								))}
							</div>
							
							<p className="text-gray-700 mb-6 italic">"{testimonial.text}"</p>
							
							<div className="flex items-center justify-between">
								<div className="flex items-center flex-1">
									<img
										src={testimonial.image}
										alt={testimonial.name}
										width="48"
										height="48"
										className="w-12 h-12 rounded-full mr-4 object-cover"
										loading="lazy"
									/>
									<div>
										<h4 className="font-semibold text-gray-900">{testimonial.name}</h4>
										<p className="text-sm text-gray-700">{testimonial.service}</p>
									</div>
								</div>
								{testimonial.source && testimonial.sourceUrl && (
									<a 
										href={testimonial.sourceUrl}
										target="_blank"
										rel="noopener noreferrer"
										className={`ml-4 px-3 py-1 text-xs font-semibold rounded-full whitespace-nowrap hover:opacity-80 transition-opacity ${
											testimonial.source === 'Google'
												? 'bg-red-100 text-red-700'
												: 'bg-blue-100 text-blue-700'
										}`}
									>
										From {testimonial.source}
									</a>
								)}
								{testimonial.source && !testimonial.sourceUrl && (
									<span className={`ml-4 px-3 py-1 text-xs font-semibold rounded-full whitespace-nowrap ${
										testimonial.source === 'Google'
											? 'bg-red-100 text-red-700'
											: 'bg-blue-100 text-blue-700'
									}`}>
										{testimonial.source}
									</span>
								)}
							</div>
						</div>
					))}
				</div>
			</div>
		</section>
	)
}
