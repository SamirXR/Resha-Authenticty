// Global variables
let currentProduct = null;

function initializeDefaultImages() {
    // Set default images for initial display
    const artisanPhoto = document.getElementById('artisanPhoto');
    if (artisanPhoto) {
        artisanPhoto.src = 'images/artisans/weaverimage.jpg';
    }
    
    const referenceImg = document.getElementById('referenceImage');
    const preProductionImg = document.getElementById('preProductionImage');
    const finalProductImg = document.getElementById('finalProductImage');
    
    if (referenceImg) referenceImg.src = 'images/reference.jpg';
    if (preProductionImg) preProductionImg.src = 'images/producitonimage.png';
    if (finalProductImg) finalProductImg.src = 'images/finalimage.png';
}

// Function to generate placeholder images as data URLs (keeping for fallback)
function generatePlaceholderImage(text, bgColor, textColor = 'white', width = 300, height = 300) {
    const canvas = document.createElement('canvas');
    const ctx = canvas.getContext('2d');
    
    canvas.width = width;
    canvas.height = height;
    
    // Set background
    ctx.fillStyle = bgColor;
    ctx.fillRect(0, 0, width, height);
    
    // Set text properties
    ctx.fillStyle = textColor;
    ctx.font = 'bold 24px Arial';
    ctx.textAlign = 'center';
    ctx.textBaseline = 'middle';
    
    // Draw text
    ctx.fillText(text, width / 2, height / 2);
    
    return canvas.toDataURL();
}

// Function to generate artisan placeholder
function generateArtisanPlaceholder(initials, size = 80) {
    const canvas = document.createElement('canvas');
    const ctx = canvas.getContext('2d');
    
    canvas.width = size;
    canvas.height = size;
    
    // Create circular background
    ctx.fillStyle = '#b8336a';
    ctx.beginPath();
    ctx.arc(size / 2, size / 2, size / 2, 0, 2 * Math.PI);
    ctx.fill();
    
    // Add text
    ctx.fillStyle = 'white';
    ctx.font = `bold ${size / 3}px Arial`;
    ctx.textAlign = 'center';
    ctx.textBaseline = 'middle';
    ctx.fillText(initials, size / 2, size / 2);
    
    return canvas.toDataURL();
}

// Sample product data (In real implementation, this would come from your backend)
const productDatabase = {
    'RSH-2024-BS-001': {
        name: 'Handwoven Silk Saree - Traditional Banarasi',
        id: 'RSH-2024-BS-001',
        material: 'Pure Silk with Gold Zari',
        dimensions: '6.5 meters length, 1.15 meters width',
        weight: '850 grams',
        manufacturingDate: 'March 15, 2025',
        // Enhanced product details
        category: 'Traditional Saree',
        subcategory: 'Banarasi Silk',
        pattern: 'Traditional Paisley with Floral Motifs',
        weaveType: 'Handloom Jacquard',
        threadCount: '120 threads per inch',
        colors: 'Deep Maroon, Gold, Cream',
        washCare: 'Dry Clean Only',
        origin: 'Varanasi, Uttar Pradesh',
        estimatedValue: '₹45,000',
        timeToWeave: '21 days',
        productStory: 'This exquisite Banarasi saree represents centuries of weaving tradition from Varanasi. Each thread tells a story of skilled craftsmanship passed down through generations.',
        artisan: {
            name: 'Radha Devi',
            title: 'Master Weaver',
            experience: '25+ years experience',
            location: 'Varanasi, Uttar Pradesh',
            photo: 'images/artisans/weaverimage.jpg',
            specialization: 'Traditional Banarasi Weaving',
            familyTradition: '4th generation weaver'
        },
        customer: {
            name: 'Priya Sharma',
            orderId: 'ORD-2024-001234',
            purchaseDate: 'March 20, 2025'
        },
        shipment: {
            orderDate: 'March 20, 2025',
            shippedDate: 'March 22, 2025',
            deliveredDate: 'March 25, 2025',
            trackingId: 'RSH2024001234TRK',
            deliveryAddress: 'Mumbai, Maharashtra'
        },
        images: {
            reference: 'images/reference.jpg',
            preProduction: 'images/producitonimage.png',
            final: 'images/finalimage.png'
        }
    }
};

// Initialize the application
document.addEventListener('DOMContentLoaded', function() {
    // Show loading screen
    setTimeout(() => {
        hideLoadingScreen();
        // Initialize default images
        initializeDefaultImages();
    }, 2000);

    // Add event listeners
    setupEventListeners();
    
    // Check if product ID is in URL
    checkUrlForProductId();
});

function initializeDefaultImages() {
    // Set actual images for initial display
    const artisanPhoto = document.getElementById('artisanPhoto');
    if (artisanPhoto) {
        artisanPhoto.src = generateArtisanPlaceholder('RD');
    }
    
    const referenceImg = document.getElementById('referenceImage');
    const preProductionImg = document.getElementById('preProductionImage');
    const finalProductImg = document.getElementById('finalProductImage');
    
    if (referenceImg) referenceImg.src = 'images/reference.jpg';
    if (preProductionImg) preProductionImg.src = 'images/producitonimage.png';
    if (finalProductImg) finalProductImg.src = 'images/finalimage.png';
}

function hideLoadingScreen() {
    const loadingScreen = document.getElementById('loadingScreen');
    const mainContent = document.getElementById('mainContent');
    
    loadingScreen.style.opacity = '0';
    setTimeout(() => {
        loadingScreen.style.display = 'none';
        mainContent.style.display = 'block';
        mainContent.style.opacity = '0';
        setTimeout(() => {
            mainContent.style.opacity = '1';
        }, 100);
    }, 500);
}

function setupEventListeners() {
    // Product ID input enter key
    const productIdInput = document.getElementById('productId');
    if (productIdInput) {
        productIdInput.addEventListener('keypress', function(e) {
            if (e.key === 'Enter') {
                verifyProduct();
            }
        });
    }
}

function checkUrlForProductId() {
    const urlParams = new URLSearchParams(window.location.search);
    const productId = urlParams.get('id');
    if (productId) {
        document.getElementById('productId').value = productId;
        verifyProduct();
    }
}

function verifyProduct() {
    const productId = document.getElementById('productId').value.trim().toUpperCase();
    
    if (!productId) {
        showNotification('Please enter a Product ID', 'error');
        return;
    }

    // Check if product exists in database
    if (productDatabase[productId]) {
        currentProduct = productDatabase[productId];
        displayProductVerification(currentProduct);
        showNotification('Product verified successfully!', 'success');
    } else {
        showNotification('Product ID not found. Please check and try again.', 'error');
    }
}

function displayProductVerification(product) {
    // Update product information
    document.getElementById('productName').textContent = product.name;
    document.getElementById('displayProductId').textContent = product.id;
    
    // Display actual product images
    const referenceImg = document.getElementById('referenceImage');
    const preProductionImg = document.getElementById('preProductionImage');
    const finalProductImg = document.getElementById('finalProductImage');
    
    referenceImg.src = product.images.reference;
    preProductionImg.src = product.images.preProduction;
    finalProductImg.src = product.images.final;
    
    // Update product details
    updateProductDetails(product);
    
    // Update artisan information
    updateArtisanInfo(product.artisan);
    
    // Update customer information
    updateCustomerInfo(product.customer);
    
    // Update shipment information
    updateShipmentInfo(product.shipment);
    
    // Show verification section
    document.getElementById('verification').style.display = 'block';
    
    // Scroll to verification section
    document.getElementById('verification').scrollIntoView({ 
        behavior: 'smooth',
        block: 'start'
    });
}

function updateProductDetails(product) {
    const detailsGrid = document.querySelector('.details-grid');
    detailsGrid.innerHTML = `
        <div class="detail-item">
            <label>Product Name</label>
            <value>${product.name}</value>
        </div>
        <div class="detail-item">
            <label>Product ID</label>
            <value>${product.id}</value>
        </div>
        <div class="detail-item">
            <label>Category</label>
            <value>${product.category} - ${product.subcategory}</value>
        </div>
        <div class="detail-item">
            <label>Material</label>
            <value>${product.material}</value>
        </div>
        <div class="detail-item">
            <label>Dimensions</label>
            <value>${product.dimensions}</value>
        </div>
        <div class="detail-item">
            <label>Weight</label>
            <value>${product.weight}</value>
        </div>
        <div class="detail-item">
            <label>Pattern Design</label>
            <value>${product.pattern}</value>
        </div>
        <div class="detail-item">
            <label>Weave Type</label>
            <value>${product.weaveType}</value>
        </div>
        <div class="detail-item">
            <label>Thread Count</label>
            <value>${product.threadCount}</value>
        </div>
        <div class="detail-item">
            <label>Color Palette</label>
            <value>${product.colors}</value>
        </div>
        <div class="detail-item">
            <label>Manufacturing Date</label>
            <value>${product.manufacturingDate}</value>
        </div>
        <div class="detail-item">
            <label>Time to Weave</label>
            <value>${product.timeToWeave}</value>
        </div>
        <div class="detail-item">
            <label>Origin</label>
            <value>${product.origin}</value>
        </div>
        <div class="detail-item">
            <label>Estimated Value</label>
            <value>${product.estimatedValue}</value>
        </div>
        <div class="detail-item">
            <label>Wash Care</label>
            <value>${product.washCare}</value>
        </div>
        <div class="detail-item full-width">
            <label>Product Story</label>
            <value class="product-story">${product.productStory}</value>
        </div>
    `;
}

function updateArtisanInfo(artisan) {
    const artisanProfile = document.querySelector('.artisan-profile');
    
    artisanProfile.innerHTML = `
        <img src="${artisan.photo}" alt="${artisan.name}" class="artisan-photo">
        <div class="artisan-details">
            <h6>${artisan.name}</h6>
            <p class="text-muted">${artisan.title}</p>
            <p class="experience">${artisan.experience}</p>
            <p class="specialization"><i class="bi bi-star"></i> ${artisan.specialization}</p>
            <p class="family-tradition"><i class="bi bi-people"></i> ${artisan.familyTradition}</p>
            <p class="location"><i class="bi bi-geo-alt"></i> ${artisan.location}</p>
        </div>
    `;
}

function updateCustomerInfo(customer) {
    const customerDetails = document.querySelector('.customer-details');
    customerDetails.innerHTML = `
        <div class="detail-row">
            <span class="label">Name:</span>
            <span class="value">${customer.name}</span>
        </div>
        <div class="detail-row">
            <span class="label">Order ID:</span>
            <span class="value">${customer.orderId}</span>
        </div>
        <div class="detail-row">
            <span class="label">Purchase Date:</span>
            <span class="value">${customer.purchaseDate}</span>
        </div>
    `;
}

function updateShipmentInfo(shipment) {
    const timeline = document.querySelector('.shipment-timeline');
    timeline.innerHTML = `
        <div class="timeline-item completed">
            <div class="timeline-icon"><i class="bi bi-check-circle"></i></div>
            <div class="timeline-content">
                <h6>Order Confirmed</h6>
                <p>${shipment.orderDate}</p>
            </div>
        </div>
        <div class="timeline-item completed">
            <div class="timeline-icon"><i class="bi bi-check-circle"></i></div>
            <div class="timeline-content">
                <h6>Shipped</h6>
                <p>${shipment.shippedDate}</p>
            </div>
        </div>
        <div class="timeline-item completed">
            <div class="timeline-icon"><i class="bi bi-check-circle"></i></div>
            <div class="timeline-content">
                <h6>Delivered</h6>
                <p>${shipment.deliveredDate}</p>
            </div>
        </div>
    `;
    
    const trackingInfo = document.querySelector('.tracking-info');
    trackingInfo.innerHTML = `
        <p><strong>Tracking ID:</strong> ${shipment.trackingId}</p>
        <p><strong>Delivery Address:</strong> ${shipment.deliveryAddress}</p>
    `;
}


function downloadCertificate() {
    if (!currentProduct) {
        showNotification('No product selected for certificate generation', 'error');
        return;
    }

    showNotification('Generating certificate...', 'info');
    
    // Load QR code image and generate certificate
    loadImageAsBase64('images/qrcode.png')
        .then(qrCodeData => {
            // Create certificate using jsPDF in landscape orientation
            const { jsPDF } = window.jspdf;
            const doc = new jsPDF('landscape', 'mm', 'a4');
            
            // Generate the certificate with QR code
            generateCertificate(doc, currentProduct, qrCodeData);
            
            // Download the certificate
            doc.save(`Resha_Authenticity_Certificate_${currentProduct.id}.pdf`);
            
            showNotification('Certificate downloaded successfully!', 'success');
        })
        .catch(error => {
            console.warn('QR code image failed to load, generating without QR code:', error);
            // Generate certificate without QR code as fallback
            const { jsPDF } = window.jspdf;
            const doc = new jsPDF('landscape', 'mm', 'a4');
            generateCertificate(doc, currentProduct, null);
            doc.save(`Resha_Authenticity_Certificate_${currentProduct.id}.pdf`);
            showNotification('Certificate downloaded successfully!', 'success');
        });
}

function loadImageAsBase64(src) {
    return new Promise((resolve, reject) => {
        const img = new Image();
        img.crossOrigin = 'anonymous';
        img.onload = function() {
            const canvas = document.createElement('canvas');
            const ctx = canvas.getContext('2d');
            canvas.width = this.width;
            canvas.height = this.height;
            ctx.drawImage(this, 0, 0);
            const dataURL = canvas.toDataURL('image/png');
            resolve(dataURL);
        };
        img.onerror = reject;
        img.src = src;
    });
}

function generateCertificate(doc, product, qrCodeData) {
    // Get page dimensions for landscape orientation
    const pageWidth = doc.internal.pageSize.getWidth();
    const pageHeight = doc.internal.pageSize.getHeight();
    
    // Colors
    const brandPink = [184, 51, 106];
    const deepPink = [139, 45, 90];
    const darkGray = [44, 44, 44];
    const lightPink = [248, 241, 244];
    
    // Background gradient effect
    doc.setFillColor(...lightPink);
    doc.rect(0, 0, pageWidth, pageHeight, 'F');
    
    // Decorative borders
    doc.setLineWidth(5);
    doc.setDrawColor(...brandPink);
    doc.rect(8, 8, pageWidth - 16, pageHeight - 16);
    
    doc.setLineWidth(1);
    doc.setDrawColor(...deepPink);
    doc.rect(16, 16, pageWidth - 32, pageHeight - 32);
    
    // Header section with ornate design
    doc.setFontSize(42);
    doc.setTextColor(...brandPink);
    doc.setFont('helvetica', 'bold');
    doc.text('RESHA', pageWidth / 2, 35, { align: 'center' });
    
    doc.setFontSize(16);
    doc.setTextColor(...darkGray);
    doc.setFont('helvetica', 'italic');
    doc.text('Heritage Threads - Authentic Handloom Verification', pageWidth / 2, 45, { align: 'center' });
    
    // Certificate title with fancy styling
    doc.setFontSize(28);
    doc.setTextColor(...deepPink);
    doc.setFont('helvetica', 'bold');
    doc.text('CERTIFICATE OF AUTHENTICITY', pageWidth / 2, 65, { align: 'center' });
    
    // Subtitle
    doc.setFontSize(14);
    doc.setTextColor(...darkGray);
    doc.setFont('helvetica', 'normal');
    doc.text('This certifies that the following handloom product is genuine and authentic', pageWidth / 2, 75, { align: 'center' });
    
    // Main content area with two columns
    const leftColumn = 25;
    const rightColumn = pageWidth / 2 + 15;
    let yPos = 95;
    
    // Left Column - Product Details
    doc.setFontSize(16);
    doc.setTextColor(...brandPink);
    doc.setFont('helvetica', 'bold');
    doc.text('PRODUCT DETAILS', leftColumn, yPos);
    
    // Decorative underline
    doc.setLineWidth(2);
    doc.setDrawColor(...brandPink);
    doc.line(leftColumn, yPos + 2, leftColumn + 80, yPos + 2);
    
    yPos += 12;
    doc.setFontSize(11);
    doc.setFont('helvetica', 'normal');
    doc.setTextColor(...darkGray);
    
    const productDetails = [
        ['Product Name:', 'Handwoven Silk Saree - Traditional Banarasi'],
        ['Product ID:', 'RSH-2024-BS-001'],
        ['Artisan Name:', 'Radha Devi'],
        ['Manufacturing Date:', 'March 15, 2025']
    ];
    
    productDetails.forEach(([label, value]) => {
        doc.setFont('helvetica', 'bold');
        doc.setTextColor(...deepPink);
        doc.text(label, leftColumn, yPos);
        doc.setFont('helvetica', 'normal');
        doc.setTextColor(...darkGray);
        doc.text(value, leftColumn, yPos + 6);
        yPos += 18;
    });
    
    // Right Column - Customer Details
    yPos = 95;
    doc.setFontSize(16);
    doc.setTextColor(...brandPink);
    doc.setFont('helvetica', 'bold');
    doc.text('CUSTOMER DETAILS', rightColumn, yPos);
    
    // Decorative underline
    doc.setLineWidth(2);
    doc.setDrawColor(...brandPink);
    doc.line(rightColumn, yPos + 2, rightColumn + 80, yPos + 2);
    
    yPos += 12;
    doc.setFontSize(11);
    doc.setFont('helvetica', 'normal');
    doc.setTextColor(...darkGray);
    
    const customerDetails = [
        ['Customer Name:', 'Priya Sharma'],
        ['Order ID:', 'ORD-2024-001234'],
        ['Purchase Date:', 'March 20, 2025']
    ];
    
    customerDetails.forEach(([label, value]) => {
        doc.setFont('helvetica', 'bold');
        doc.setTextColor(...deepPink);
        doc.text(label, rightColumn, yPos);
        doc.setFont('helvetica', 'normal');
        doc.setTextColor(...darkGray);
        doc.text(value, rightColumn, yPos + 6);
        yPos += 18;
    });
    
    // QR Code area (enhanced)
    const qrX = pageWidth - 60;
    const qrY = 90;
    doc.setDrawColor(...brandPink);
    doc.setFillColor(255, 255, 255);
    doc.rect(qrX, qrY, 35, 35, 'FD');
    
    // Add QR Code image if available
    if (qrCodeData) {
        try {
            doc.addImage(qrCodeData, 'PNG', qrX + 2, qrY + 2, 31, 31);
        } catch (error) {
            console.warn('Failed to add QR code image:', error);
            // Fallback: QR placeholder grid
            doc.setLineWidth(0.5);
            doc.setDrawColor(...brandPink);
            for (let i = 0; i <= 7; i++) {
                doc.line(qrX + (i * 4), qrY, qrX + (i * 4), qrY + 35);
                doc.line(qrX, qrY + (i * 4), qrX + 35, qrY + (i * 4));
            }
        }
    } else {
        // Fallback: QR placeholder grid
        doc.setLineWidth(0.5);
        doc.setDrawColor(...brandPink);
        for (let i = 0; i <= 7; i++) {
            doc.line(qrX + (i * 4), qrY, qrX + (i * 4), qrY + 35);
            doc.line(qrX, qrY + (i * 4), qrX + 35, qrY + (i * 4));
        }
    }
    
    doc.setFontSize(8);
    doc.setTextColor(...brandPink);
    doc.text('Scan for', qrX + 17.5, qrY + 40, { align: 'center' });
    doc.text('Verification', qrX + 17.5, qrY + 47, { align: 'center' });
    
    // Footer with decorative elements
    const footerY = pageHeight - 25;
    
    doc.setFontSize(10);
    doc.setTextColor(...darkGray);
    doc.setFont('helvetica', 'italic');
    doc.text('This certificate is digitally generated and serves as proof of authenticity for this handloom creation.', 
             pageWidth / 2, footerY, { align: 'center' });
    
    doc.setFont('helvetica', 'normal');
    doc.text(`Certificate Generated: ${new Date().toLocaleDateString()} | Resha Heritage Threads © 2025`, 
             pageWidth / 2, footerY + 8, { align: 'center' });
}

function showNotification(message, type = 'info') {
    // Remove existing notifications
    const existingNotifications = document.querySelectorAll('.notification');
    existingNotifications.forEach(notification => notification.remove());
    
    // Create notification element
    const notification = document.createElement('div');
    notification.className = `notification notification-${type}`;
    notification.innerHTML = `
        <div class="notification-content">
            <i class="bi bi-${getNotificationIcon(type)}"></i>
            <span>${message}</span>
            <button class="notification-close" onclick="this.parentElement.parentElement.remove()">
                <i class="bi bi-x"></i>
            </button>
        </div>
    `;
    
    // Add notification styles
    notification.style.cssText = `
        position: fixed;
        top: 20px;
        right: 20px;
        background: ${getNotificationColor(type)};
        color: white;
        padding: 1rem 1.5rem;
        border-radius: 0.5rem;
        box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
        z-index: 10000;
        min-width: 300px;
        animation: slideInRight 0.3s ease;
    `;
    
    // Add to document
    document.body.appendChild(notification);
    
    // Auto remove after 5 seconds
    setTimeout(() => {
        if (notification.parentElement) {
            notification.style.animation = 'slideOutRight 0.3s ease';
            setTimeout(() => notification.remove(), 300);
        }
    }, 5000);
}

function getNotificationIcon(type) {
    switch (type) {
        case 'success': return 'check-circle';
        case 'error': return 'exclamation-circle';
        case 'warning': return 'exclamation-triangle';
        default: return 'info-circle';
    }
}

function getNotificationColor(type) {
    switch (type) {
        case 'success': return '#10b981';
        case 'error': return '#ef4444';
        case 'warning': return '#f59e0b';
        default: return '#3b82f6';
    }
}

// Add notification animations
const style = document.createElement('style');
style.textContent = `
    @keyframes slideInRight {
        from {
            transform: translateX(100%);
            opacity: 0;
        }
        to {
            transform: translateX(0);
            opacity: 1;
        }
    }
    
    @keyframes slideOutRight {
        from {
            transform: translateX(0);
            opacity: 1;
        }
        to {
            transform: translateX(100%);
            opacity: 0;
        }
    }
    
    .notification-content {
        display: flex;
        align-items: center;
        gap: 0.75rem;
    }
    
    .notification-close {
        background: none;
        border: none;
        color: inherit;
        cursor: pointer;
        padding: 0;
        margin-left: auto;
        font-size: 1.2rem;
    }
    
    .notification-close:hover {
        opacity: 0.8;
    }
`;
document.head.appendChild(style);

// Smooth scrolling for navigation links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    });
});

// Add some sample QR code functionality (for demonstration)
function simulateQRScan(productId) {
    document.getElementById('productId').value = productId;
    verifyProduct();
}

// Export functions for global access
window.verifyProduct = verifyProduct;
window.downloadCertificate = downloadCertificate;
window.simulateQRScan = simulateQRScan;

// Image Modal Functions
function openImageModal(img) {
    const modal = document.getElementById('imageModal');
    const modalImg = document.getElementById('modalImage');
    const caption = document.getElementById('modalCaption');
    
    modal.style.display = 'block';
    modalImg.src = img.src;
    caption.textContent = img.alt;
    
    // Prevent body scroll when modal is open
    document.body.style.overflow = 'hidden';
}

function closeImageModal() {
    const modal = document.getElementById('imageModal');
    modal.style.display = 'none';
    
    // Restore body scroll
    document.body.style.overflow = 'auto';
}

// Close modal when clicking outside the image
document.addEventListener('DOMContentLoaded', function() {
    const modal = document.getElementById('imageModal');
    if (modal) {
        modal.addEventListener('click', function(e) {
            if (e.target === modal) {
                closeImageModal();
            }
        });
    }
    
    // Close modal with Escape key
    document.addEventListener('keydown', function(e) {
        if (e.key === 'Escape') {
            closeImageModal();
        }
    });
});

// Export modal functions for global access
window.openImageModal = openImageModal;
window.closeImageModal = closeImageModal;
