
document.addEventListener("DOMContentLoaded", () => {
    // --- Sticky Header Functionality ---
    const header = document.querySelector(".header")
    let lastScrollY = window.scrollY
    const headerHeight = header.offsetHeight // Get initial header height
  
    window.addEventListener("scroll", () => {
      const currentScrollY = window.scrollY
  
      if (currentScrollY > headerHeight) {
        // Only apply sticky behavior after scrolling past initial header
        header.classList.add("sticky")
        if (currentScrollY > lastScrollY) {
          // Scrolling down
          header.classList.add("sticky-hidden")
        } else {
          // Scrolling up
          header.classList.remove("sticky-hidden")
        }
      } else {
        // At the top of the page or within the initial header height
        header.classList.remove("sticky")
        header.classList.remove("sticky-hidden")
      }
      lastScrollY = currentScrollY
    })
  
    // --- Mobile Menu Toggle ---
    const menuToggle = document.querySelector(".menu-toggle")
    const navList = document.querySelector(".nav-list")
  
    menuToggle.addEventListener("click", () => {
      navList.classList.toggle("show")
    })
  
    // --- Dropdown Menu Functionality ---
    const dropdownToggle = document.querySelector(".dropdown-toggle")
    const dropdownMenu = document.querySelector(".dropdown-menu")
  
    dropdownToggle.addEventListener("click", (e) => {
      e.preventDefault() // Prevent default link behavior
      dropdownMenu.classList.toggle("show")
      // Close dropdown if clicked outside
      e.stopPropagation() // Prevent this click from immediately closing the dropdown via document click
    })
  
    document.addEventListener("click", (e) => {
      if (!dropdownToggle.contains(e.target) && !dropdownMenu.contains(e.target)) {
        dropdownMenu.classList.remove("show")
      }
    })
  
    // --- Image Carousel Functionality ---
    const mainProductImage = document.querySelector(".main-product-image")
    const thumbnails = document.querySelectorAll(".thumbnail")
    const leftArrow = document.querySelector(".left-arrow")
    const rightArrow = document.querySelector(".right-arrow")
    const thumbnailZoomPreview = document.querySelector(".thumbnail-zoom-preview")
  
    // Array of image sources for the carousel
    const imageSources = [
      "./Asset/Frame-1.png", 
      "./Asset/Frame-1.png",
      "./Asset/Frame-1.png",
      "./Asset/Frame-1.png",
      "./Asset/Frame-1.png",
      "./Asset/Frame-1.png",
    ]
    let currentImageIndex = 0
  
    // Function to update the main image and active thumbnail
    function updateMainImage(index) {
      mainProductImage.src = imageSources[index]
      mainProductImage.alt = thumbnails[index].alt // Update alt text
  
      // Remove active class from all thumbnails
      thumbnails.forEach((thumb) => thumb.classList.remove("active"))
      // Add active class to the current thumbnail
      thumbnails[index].classList.add("active")
      currentImageIndex = index
    }
  
    // Initialize with the first image as active
    updateMainImage(0)
  
    // Thumbnail click handler
    thumbnails.forEach((thumbnail, index) => {
      thumbnail.addEventListener("click", () => {
        updateMainImage(index)
      })
  
      // Thumbnail hover for zoom preview
      thumbnail.addEventListener("mouseover", (e) => {
        const thumbRect = thumbnail.getBoundingClientRect()
        const carouselRect = document.querySelector(".product-image-carousel").getBoundingClientRect()
  
        // Position the zoom preview relative to the carousel container
        // Adjust top to be above the thumbnail, and left to be centered or slightly offset
        thumbnailZoomPreview.style.top = `${thumbRect.top - carouselRect.top - thumbnailZoomPreview.offsetHeight - 10}px` // 10px above thumbnail
        thumbnailZoomPreview.style.left = `${thumbRect.left - carouselRect.left + (thumbRect.width / 2) - thumbnailZoomPreview.offsetWidth / 2}px`
  
        thumbnailZoomPreview.style.backgroundImage = `url(${imageSources[index]})`
        thumbnailZoomPreview.style.display = "block"
      })
  
      thumbnail.addEventListener("mouseout", () => {
        thumbnailZoomPreview.style.display = "none"
      })
    })
  
    // Carousel arrow click handlers
    leftArrow.addEventListener("click", () => {
      let newIndex = currentImageIndex - 1
      if (newIndex < 0) {
        newIndex = imageSources.length - 1 // Loop to last image
      }
      updateMainImage(newIndex)
    })
  
    rightArrow.addEventListener("click", () => {
      let newIndex = currentImageIndex + 1
      if (newIndex >= imageSources.length) {
        newIndex = 0 // Loop to first image
      }
      updateMainImage(newIndex)
    })
  })
  
  function handleCompanyLogos() {
    const companyLogos = document.querySelector('.company-logos');
    const logoImages = companyLogos ? companyLogos.querySelectorAll('img') : [];
    
    if (logoImages.length === 0) return;
    
    const screenWidth = window.innerWidth;
    
    // Hide all logos first
    logoImages.forEach(img => {
      img.style.display = 'none';
    });
    
    // Show appropriate number of logos based on screen width
    if (screenWidth >= 1240) {
      // Desktop: Show all 6 icons
      logoImages.forEach(img => {
        img.style.display = 'block';
      });
    } else if (screenWidth >= 1000) {
      // Tablet: Show 4-5 icons
      logoImages.forEach((img, index) => {
        img.style.display = index < 5 ? 'block' : 'none';
      });
    } else if(screenWidth >= 550) {
      // Mobile: Show 3 icons
      logoImages.forEach((img, index) => {
        img.style.display = index < 4 ? 'block' : 'none';
      });
    }
    else{
      // Mobile: Show 3 icons
      logoImages.forEach((img, index) => {
        img.style.display = index < 3 ? 'block' : 'none';
      });
    }

  }
  
  // Initialize on page load
  document.addEventListener('DOMContentLoaded', () => {
    handleCompanyLogos();
  });
  
  // Handle resize events
  window.addEventListener('resize', () => {
    handleCompanyLogos();
  });
  
  // Optional: Add smooth transitions
  function addLogoTransitions() {
    const logoImages = document.querySelectorAll('.company-logos img');
    logoImages.forEach(img => {
      img.style.transition = 'opacity 0.3s ease, transform 0.3s ease';
    });
  }
  
  // Call this after DOM is loaded
  document.addEventListener('DOMContentLoaded', () => {
    addLogoTransitions();
  });


//   faq section js 

document.addEventListener("DOMContentLoaded", () => {
    // --- FAQ Functionality ---
    const faqItems = document.querySelectorAll(".faq-item")
  
    faqItems.forEach((item) => {
      const question = item.querySelector(".faq-question")
      const answer = item.querySelector(".faq-answer")
  
      question.addEventListener("click", () => {
        const isActive = item.classList.contains("active")
  
        // Close all FAQ items
        faqItems.forEach((faqItem) => {
          faqItem.classList.remove("active")
          faqItem.querySelector(".faq-question").setAttribute("aria-expanded", "false")
        })
  
        // Open clicked item if it wasn't active
        if (!isActive) {
          item.classList.add("active")
          question.setAttribute("aria-expanded", "true")
        }
      })
    })
  
    // --- Email Catalogue Functionality ---
    const emailInput = document.querySelector(".email-input")
    const sendButton = document.querySelector(".send-catalogue-btn")
  
    if (sendButton && emailInput) {
      sendButton.addEventListener("click", () => {
        const email = emailInput.value.trim()
  
        if (!email) {
          alert("Please enter your email address")
          emailInput.focus()
          return
        }
  
        if (!isValidEmail(email)) {
          alert("Please enter a valid email address")
          emailInput.focus()
          return
        }
  
        // Simulate sending catalogue
        const originalText = sendButton.textContent
        sendButton.textContent = "SENDING..."
        sendButton.disabled = true
  
        setTimeout(() => {
          sendButton.textContent = "SENT ✓"
          setTimeout(() => {
            sendButton.textContent = originalText
            sendButton.disabled = false
            emailInput.value = ""
            alert("Catalogue sent successfully! Check your email.")
          }, 2000)
        }, 1500)
      })
  
      // Handle Enter key in email input
      emailInput.addEventListener("keypress", (e) => {
        if (e.key === "Enter") {
          sendButton.click()
        }
      })
    }
  
    // --- Applications Carousel Functionality ---
    const carouselTrack = document.querySelector(".carousel-track")
    const prevBtn = document.querySelector(".prev-btn")
    const nextBtn = document.querySelector(".next-btn")
    const cards = document.querySelectorAll(".application-card")
  
    if (carouselTrack && cards.length > 0) {
      let currentIndex = 0
      const cardWidth = cards[0].offsetWidth + 12 // Card width + gap
      const visibleCards = Math.floor(carouselTrack.parentElement.offsetWidth / cardWidth)
      const maxIndex = Math.max(0, cards.length - visibleCards)
  
      function updateCarousel() {
        const translateX = -currentIndex * cardWidth
        carouselTrack.style.transform = `translateX(${translateX}px)`
  
        // Update button states
        if (prevBtn) prevBtn.disabled = currentIndex === 0
        if (nextBtn) nextBtn.disabled = currentIndex >= maxIndex
      }
  
      if (prevBtn) {
        prevBtn.addEventListener("click", () => {
          if (currentIndex > 0) {
            currentIndex--
            updateCarousel()
          }
        })
      }
  
      if (nextBtn) {
        nextBtn.addEventListener("click", () => {
          if (currentIndex < maxIndex) {
            currentIndex++
            updateCarousel()
          }
        })
      }
  
      // Initialize carousel
      updateCarousel()
  
      // Handle window resize
      window.addEventListener("resize", () => {
        const newVisibleCards = Math.floor(carouselTrack.parentElement.offsetWidth / cardWidth)
        const newMaxIndex = Math.max(0, cards.length - newVisibleCards)
  
        if (currentIndex > newMaxIndex) {
          currentIndex = newMaxIndex
        }
        updateCarousel()
      })
    }
  
    // --- Manufacturing Process Tabs ---
    const tabButtons = document.querySelectorAll(".tab-btn")
    const tabContents = document.querySelectorAll(".tab-content")
  
    tabButtons.forEach((button) => {
      button.addEventListener("click", () => {
        const targetTab = button.getAttribute("data-tab")
  
        // Remove active class from all buttons and contents
        tabButtons.forEach((btn) => btn.classList.remove("active"))
        tabContents.forEach((content) => content.classList.remove("active"))
  
        // Add active class to clicked button and corresponding content
        button.classList.add("active")
        const targetContent = document.getElementById(targetTab)
        if (targetContent) {
          targetContent.classList.add("active")
        }
      })
    })

  
    // --- Touch Scrolling for Mobile Carousel ---
    let isDown = false
    let startX
    let scrollLeft
  
    if (carouselTrack) {
      carouselTrack.addEventListener("mousedown", (e) => {
        isDown = true
        carouselTrack.style.cursor = "grabbing"
        startX = e.pageX - carouselTrack.offsetLeft
        scrollLeft = carouselTrack.scrollLeft
      })
  
      carouselTrack.addEventListener("mouseleave", () => {
        isDown = false
        carouselTrack.style.cursor = "grab"
      })
  
      carouselTrack.addEventListener("mouseup", () => {
        isDown = false
        carouselTrack.style.cursor = "grab"
      })
  
      carouselTrack.addEventListener("mousemove", (e) => {
        if (!isDown) return
        e.preventDefault()
        const x = e.pageX - carouselTrack.offsetLeft
        const walk = (x - startX) * 2
        carouselTrack.scrollLeft = scrollLeft - walk
      })
    }
  
    // --- Smooth Scroll Animation for Tab Content ---
    const observerOptions = {
      threshold: 0.1,
      rootMargin: "0px 0px -50px 0px",
    }
  
    const contentObserver = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.style.opacity = "1"
          entry.target.style.transform = "translateY(0)"
        }
      })
    }, observerOptions)
  
    // Observe tab contents for animation
    tabContents.forEach((content) => {
      content.style.opacity = "0"
      content.style.transform = "translateY(20px)"
      content.style.transition = "opacity 0.6s ease, transform 0.6s ease"
      contentObserver.observe(content)
    })
  
    // --- Utility Functions ---
    function isValidEmail(email) {
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
      return emailRegex.test(email)
    }
  })
  

  // part 3 starts here 

  document.addEventListener("DOMContentLoaded", () => {
    // --- Testimonials Carousel Functionality ---
    const testimonialsCarousel = document.querySelector(".testimonials-carousel")
    const carouselTrack = testimonialsCarousel ? testimonialsCarousel.querySelector(".carousel-track") : null
    const testimonialCards = testimonialsCarousel ? testimonialsCarousel.querySelectorAll(".testimonial-card") : []
  
    if (carouselTrack && testimonialCards.length > 0) {
      let isDown = false
      let startX
      let scrollLeft
  
      // Mouse events for desktop drag
      carouselTrack.addEventListener("mousedown", (e) => {
        isDown = true
        carouselTrack.classList.add("active-drag")
        startX = e.pageX - carouselTrack.offsetLeft
        scrollLeft = carouselTrack.scrollLeft
      })
  
      carouselTrack.addEventListener("mouseleave", () => {
        isDown = false
        carouselTrack.classList.remove("active-drag")
      })
  
      carouselTrack.addEventListener("mouseup", () => {
        isDown = false
        carouselTrack.classList.remove("active-drag")
      })
  
      carouselTrack.addEventListener("mousemove", (e) => {
        if (!isDown) return
        e.preventDefault()
        const x = e.pageX - carouselTrack.offsetLeft
        const walk = (x - startX) * 1.5 // Adjust scroll speed
        carouselTrack.scrollLeft = scrollLeft - walk
      })
  
      // Touch events for mobile swipe
      carouselTrack.addEventListener("touchstart", (e) => {
        isDown = true
        startX = e.touches[0].pageX - carouselTrack.offsetLeft
        scrollLeft = carouselTrack.scrollLeft
      })
  
      carouselTrack.addEventListener("touchend", () => {
        isDown = false
      })
  
      carouselTrack.addEventListener("touchmove", (e) => {
        if (!isDown) return
        const x = e.touches[0].pageX - carouselTrack.offsetLeft
        const walk = (x - startX) * 1.5
        carouselTrack.scrollLeft = scrollLeft - walk
      })
    }
  
    // --- Learn More Button Functionality (Portfolio Cards) ---
    const learnMoreButtons = document.querySelectorAll(".learn-more-btn")
  
    learnMoreButtons.forEach((button) => {
      button.addEventListener("click", () => {
        // In a real application, this would navigate to a product detail page
        // or open a modal with more information.
        const cardTitle = button.closest(".portfolio-card").querySelector("h3").textContent
        alert(`You clicked "Learn More" for: ${cardTitle}`)
        console.log(`Learn More clicked for: ${cardTitle}`)
      })
    })
  
    // --- Talk to an Expert Button Functionality (CTA Section) ---
    const talkToExpertBtn = document.querySelector(".talk-to-expert-btn")
  
    if (talkToExpertBtn) {
      talkToExpertBtn.addEventListener("click", () => {
        // In a real application, this would open a contact form modal,
        // redirect to a contact page, or initiate a chat.
        alert("Connecting you with an expert! Please wait...")
        console.log("Talk to an Expert button clicked.")
      })
    }
  
    // --- Intersection Observer for Section Animations ---
    const sectionsToAnimate = document.querySelectorAll(
      ".testimonials-section .section-title, .testimonials-section .section-subtitle, .testimonial-card, " +
        ".portfolio-section .section-title, .portfolio-section .section-subtitle, .portfolio-card, " +
        ".cta-section .cta-box",
    )
  
    const observerOptions = {
      threshold: 0.1, // Trigger when 10% of the element is visible
      rootMargin: "0px 0px -50px 0px", // Adjust when element enters viewport
    }
  
    const sectionObserver = new IntersectionObserver((entries, observer) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("fade-in-up") // Add a class for animation
          observer.unobserve(entry.target) // Stop observing once animated
        }
      })
    }, observerOptions)
  
    // sectionsToAnimate.forEach((element, index) => {
    //   // Add initial styles for animation
    //   element.style.opacity = "0"
    //   element.style.transform = "translateY(20px)"
    //   element.style.transition = `opacity 0.6s ease ${index * 0.05}s, transform 0.6s ease ${index * 0.05}s`
    //   sectionObserver.observe(element)
    // })
  })
  