import Image from 'next/image'

import ImageComponent from '../_components/image';

export default function About() {
    return (
        <div className="p-10 flex flex-col lg:items-center lg:justify-center lg:flex-1 lg:h-full pb-[184px] lg:pb-[80px]">
            <div className="flex flex-col space-y-5 lg:space-y-0 lg:grid lg:grid-cols-12 lg:gap-4">
                <div className="lg:col-span-6 flex flex-col space-y-5 lg:space-y-2.5">
                    <h1 className="text-4xl	lg:text-5xl	font-medium">
                        Hi! I’m Camden.
                    </h1>
                    <div>
                    <p className="text-lg lg:text-2xl font-medium">
                        Designer. Professor. Entrepreneur. Dude.
                    </p>
                    <p className="text-lg lg:text-2xl font-light">
                        As a Design Lead at Walmart and the company’s first industrial designer, I am innovating the future of retail at the world’s largest company. Over the last decade of my career, I have explored consultancies, corporations, freelance, entrepreneurship, and academia. I share my love and passion for design with clients, teams, students and others, sometimes for money.
                    </p>
                    </div>
                    <ul className="hidden lg:flex text-4xl leading-[3rem] font-medium  flex-row flex-wrap">
                        <li>
                            50+ projects. 
                        </li>
                        <li>
                            25+ products launched.
                        </li> 
                        <li>
                            30 design awards. 
                        </li> 
                        <li>
                            9 patents granted.
                        </li>
                        <li>
                            $5M startup revenue. 
                        </li>
                        <li>
                            3 speakerships. 
                        </li>
                        <li>
                            2 professorship. 
                        </li>
                        <li>
                            11 mentorships.
                        </li>
                    </ul>
                </div>
                
                <div className="lg:col-start-8 lg:col-span-5 lg:flex lg:justify-end">
            {/* <Image
                src="/images/profile_picture.jpg"
                width={600}
                height={600}
                alt="Picture of the author"
            /> */}
            <ImageComponent imageUrl="/images/profile_picture.jpg" ratio={1} />
            
                </div>
            </div>
        </div>
    )
}