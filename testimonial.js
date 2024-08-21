
document.addEventListener('DOMContentLoaded', () => {
    const testimonialsList = document.getElementById('testimonialsList');
    const testimonialForm = document.getElementById('testimonialForm');
    const nameInput = document.getElementById('name');
    const messageInput = document.getElementById('message');
    const imageInput = document.getElementById('image');

    // Existing testimonials
    const initialTestimonials = [
        {
            name: 'Dwayne Johnson',
            message: 'Just ticked off a major bucket list item: an incredible trip to the Maldives! 🌴🏝️ The crystal-clear waters, white sands, and vibrant marine life were beyond amazing. Whether diving or relaxing in an overwater villa, every moment was pure magic. The sunsets were breathtaking and the experience was soul-recharging. If you’ve got the Maldives on your list, go for it. It’s a dream come true!',
            image: 'https://ichef.bbci.co.uk/news/976/cpsprodpb/11856/production/_129266717_3196422e-7631-42c5-8c63-343aa5518cc4.jpg'
        },
        {
            name: 'Roger Federer',
            message: 'I’m thrilled to share that I’ve just ticked off a bucket list item: soaring in a hot air balloon over Turkey’s stunning landscapes! 🎈🇹🇷 The views of Cappadocia’s unique rock formations were absolutely breathtaking. The serenity and panoramic vistas from above made the experience truly unforgettable. Turkey’s beauty and history made this adventure even more special. Highly recommend adding this to your bucket list!',
            image: 'https://encrypted-tbn3.gstatic.com/images?q=tbn:ANd9GcSH7d_3Odnf3etJ6ptkrInFOhEQ_nDu3bInd0kPxMGRx17U4Him'
        },
        {
            name: 'Emma Watson',
            message: 'I’m thrilled to have checked off a bucket list dream: seeing the Northern Lights in Iceland! 🌌🇮🇸 The display of vibrant, dancing colors in the night sky was absolutely magical. Witnessing this celestial wonder against Iceland’s stunning backdrop was an unforgettable experience. If you ever get the chance, this is a must-see. It’s a truly breathtaking and awe-inspiring sight!',
            image: 'https://www.eatingwell.com/thmb/aty1ViWJ1AmKX2kfAFYUa5vm2N8=/1500x0/filters:no_upscale():max_bytes(150000):strip_icc()/Emma-Watson-Just-Shared-a-Chocolate-Espresso-Martini-and-All-We-Can-Say-Is-Wow-f430738e367b40a5bf92a47c73d6bc7f.jpg'
        }
    ];

    // Load existing testimonials from localStorage 
    function loadTestimonials() {
        const savedTestimonials = JSON.parse(localStorage.getItem('testimonials'));
        return savedTestimonials || initialTestimonials;
    }

    // Save testimonials to localStorage
    function saveTestimonials(testimonials) {
        localStorage.setItem('testimonials', JSON.stringify(testimonials));
    }

    // show testimonials
    function renderTestimonials() {
        const testimonials = loadTestimonials();
        testimonialsList.innerHTML = testimonials.map(testimonial => `
            <div class="testimonial-item">
                <img src="${testimonial.image}" alt="Testimonial Image">
                <div>
                    <h5>${testimonial.name}</h5>
                    <p>${testimonial.message}</p>
                </div>
            </div>
        `).join('');
    }

    // show existing testimonials on page load
    renderTestimonials();

    // Handle form submission
    testimonialForm.addEventListener('submit', (event) => {
        event.preventDefault();

        const name = nameInput.value.trim();
        const message = messageInput.value.trim();
        const imageFile = imageInput.files[0];

        if (name && message) {
            const imageUrl = imageFile ? URL.createObjectURL(imageFile) : 'https://via.placeholder.com/100';

            const newTestimonial = { name, message, image: imageUrl };
            const testimonials = loadTestimonials();
            testimonials.push(newTestimonial);
            saveTestimonials(testimonials);

            nameInput.value = '';
            messageInput.value = '';
            imageInput.value = '';

            renderTestimonials();
        }
    });
});
