import React from "react";

const MissionPage = () => {
    return (
        <div
            className="relative min-h-screen bg-cover bg-center text-white"
            style={{
                backgroundImage: `url('https://example.com/your-background-image.jpg')`, // Replace with actual image URL
            }}
        >
            {/* Dark overlay for text contrast */}
            <div className="absolute inset-0 bg-black bg-opacity-60"></div>

            {/* Content Section */}
            <div className="relative z-10 flex flex-col items-center justify-center px-6 py-12 text-center">
                {/* Mission Title */}
                <h2 className="text-4xl font-bold text-yellow-300 mb-4 uppercase tracking-wide">
                    Our Mission
                </h2>

                {/* Mission Statement */}
                <h3 className="text-3xl italic font-semibold mb-6">
                    "Sur and Sangeet is a Gift of God"
                </h3>

                {/* Description Paragraph */}
                <p className="max-w-4xl text-lg leading-relaxed mb-8">
                    Sur Se Seva is a non-profit New Jersey entity, an Art and Musicloving community that is dedicated to promoting and empowering the arts in all its forms. Music and Aart are gifts from God and have the power to heal and unite people across cultures, Language, Religions and Borders. We strive to use these gifts to serve our community through Seva (Selfless Service). Our foundation, Sur Se Seva (SSS), is committed to organizing events and performances that showcase various forms of art and craft. While our primary focus is music, we also aim to promote dance, painting, theater, drama, poetry, literature, comedy, spirituality, and more.


                </p>

                <p className="max-w-4xl text-lg leading-relaxed mb-8">
                    When we organize an event, after covering all expenses associated with the event, any surplus funds that we generate are donated back to the community thru our Non-Profit Sur Se Seva Foundation. This will ensure that any charitable cause in the community that requires our assistance can benefit from the resources generated through our events and performances. Our sole purpose is to use Sur (or any other form of Indian art and craft) to do Seva and to give back to the community, both locally and internationally.


                </p>
                <p className="max-w-4xl text-lg leading-relaxed mb-8">
                    Our events and performances are not just a showcase of talent but a celebration of diversity and inclusivity. We believe that everyone has something unique to offer, and our community is a platform where all voices can be heard. We are committed to promoting emerging artists and providing them with opportunities to showcase their talent. We believe that by nurturing young artists, we can create a community that is passionate about the arts and committed to promoting them. Working together, we can make a difference in the world and create a more harmonious and beautiful society.




                </p>
                <p className="max-w-4xl text-lg leading-relaxed mb-8">
                    We invite all music and art lovers from USA and beyond to join us in celebrating the beauty of the arts. Whether you're a musician, dancer, artist, poet, or simply a music enthusiast, there's a place for you in our community. So, join us in celebrating the beauty of the arts and the power of Sur Seva. Let us come together to create a world where art and music are celebrated, respected, and valued. Click on the link below to become a member and join our Elite and most happening music and art group.

                    https://forms.gle/rdXPgGcivvNWvknL6




                </p>

                {/* Membership Link */}
                <a
                    href="https://forms.gle/rdXpGciwnNWvknL6"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-yellow-300 underline font-medium hover:text-yellow-400"
                >
                    Become a Member
                </a>
            </div>
        </div>
    );
};

export default MissionPage;
