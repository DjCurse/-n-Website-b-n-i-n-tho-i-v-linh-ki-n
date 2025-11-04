document.addEventListener("DOMContentLoaded", () => {
    const categoryMenu = document.getElementById("category-menu");
    const breadcrumb = document.getElementById("breadcrumb");
    const homeProduct = document.querySelector(".home-product"); 
    const detailBox = document.getElementById("product-detail");
    const detailName = document.getElementById("detail-name");
    const detailBrand = document.getElementById("detail-brand");
    const detailPrice = document.getElementById("detail-price");
    const detailImage = document.getElementById("detail-image");
    const detailDescription = document.getElementById("detail-description");
    const related = document.getElementById("related-products");
    const backBtn = document.getElementById("back-btn");
    const detailStock = document.getElementById("detail-stock");
    const addCartBtn = document.getElementById("add-cart-btn");
    const buyNowBtn = document.getElementById("buy-now-btn");

    // Gán data mặc định
    document.querySelectorAll(".home-product-item").forEach(item => {
        if (!item.dataset.brand) item.dataset.brand = "Apple"; 
        if (!item.dataset.name) {
            const name = item.querySelector(".home-product-item__name")?.innerText || "Sản phẩm";
            item.dataset.name = name;
        }
        if (!item.dataset.image) {
            const bg = item.querySelector(".home-product-item__img")?.style.backgroundImage || "";
            const url = bg.match(/url\(["']?(.*?)["']?\)/);
            item.dataset.image = url ? url[1] : "";
        }
        if (!item.dataset.description) {
            item.dataset.description = "Sản phẩm " + (item.dataset.name || "") + " chính hãng, bảo hành 12 tháng.";
        }
        if (!item.dataset.stock) item.dataset.stock = "10";
    });

    // Hàm hiển thị chi tiết sản phẩm
    function showProductDetail(item) {
        homeProduct.style.display = "none";
        detailBox.style.display = "block";
        categoryMenu.style.display = "none";
        document.querySelectorAll("header, footer, .home-filter, .home-filter__classify").forEach(el => el.style.display="none");

        const brand = item.dataset.brand;
        const name = item.dataset.name;

        breadcrumb.innerHTML = `<a href="#">Trang chủ</a> &gt; <a href="#">${brand}</a> &gt; <span>${name}</span>`;
        window.scrollTo({ top: 0, behavior: "smooth" });

        detailImage.src = item.dataset.image;
        detailName.textContent = name;
        detailBrand.textContent = brand;
        detailPrice.textContent = item.querySelector(".home-product-item__price-current")?.innerText || "Liên hệ";
        detailDescription.textContent = item.dataset.description;
        detailDescription.style.whiteSpace = "pre-line";
        detailStock.textContent = parseInt(item.dataset.stock);

        // Sản phẩm liên quan giả lập
       related.innerHTML = `
    <div class="home-product-item" data-name="OPPO Reno13 5G 12GB/256GB" data-brand="OPPO" data-image="https://cdn.tgdd.vn/2025/10/timerseo/332234-600x600-3.jpg" data-description="OPPO Reno13 5G 12GB/256GB chính hãng" data-stock="10" style="text-align:center; margin-right:10px; cursor:pointer;">
        <div class="home-product-item__img" style="background-image:url(https://cdn.tgdd.vn/2025/10/timerseo/332234-600x600-3.jpg); background-size:cover; border-radius:8px;"></div>
        <h4 class="home-product-item__name">OPPO Reno13 5G 12GB/256GB</h4>
        <span class="home-product-item__price-current">22.000.000đ</span>
    </div>

    <div class="home-product-item" data-name="IPhone 16 128GB" data-brand="Apple" data-image="https://cdn.tgdd.vn/Products/Images/42/329135/iphone-16-blue-600x600.png" data-description="IPhone 16 128GB chính hãng" data-stock="8" style="text-align:center; margin-right:10px; cursor:pointer;">
        <div class="home-product-item__img" style="background-image:url(https://cdn.tgdd.vn/Products/Images/42/329135/iphone-16-blue-600x600.png); background-size:cover; border-radius:8px;"></div>
        <h4 class="home-product-item__name">IPhone 16 128GB</h4>
        <span class="home-product-item__price-current">21.490.000đ</span>
    </div>

    <div class="home-product-item" data-name="Samsung Galaxy S25 5G 128GB" data-brand="Samsung" data-image="https://cdn.tgdd.vn/Products/Images/42/333363/samsung-galaxy-s25-green-thumbai-600x600.jpg" data-description="Samsung Galaxy S25 5G 128GB chính hãng" data-stock="7" style="text-align:center; margin-right:10px; cursor:pointer;">
        <div class="home-product-item__img" style="background-image:url(https://cdn.tgdd.vn/Products/Images/42/333363/samsung-galaxy-s25-green-thumbai-600x600.jpg); background-size:cover; border-radius:8px;"></div>
        <h4 class="home-product-item__name">Samsung Galaxy S25 5G 128GB</h4>
        <span class="home-product-item__price-current">17.190.000đ</span>
    </div>

    <div class="home-product-item" data-name="Xiaomi 15 Ultra 5G 16GB/512GB" data-brand="Xiaomi" data-image="https://cdn.tgdd.vn/Products/Images/42/334844/xiaomi-15-ultra-white-thumbnew-600x600.jpg" data-description="Xiaomi 15 Ultra 5G 16GB/512GB chính hãng" data-stock="6" style="text-align:center; margin-right:10px; cursor:pointer;">
        <div class="home-product-item__img" style="background-image:url(https://cdn.tgdd.vn/Products/Images/42/334844/xiaomi-15-ultra-white-thumbnew-600x600.jpg); background-size:cover; border-radius:8px;"></div>
        <h4 class="home-product-item__name">Xiaomi 15 Ultra 5G 16GB/512GB</h4>
        <span class="home-product-item__price-current">34.360.000đ</span>
    </div>

    <div class="home-product-item" data-name="Samsung Galaxy A36 5G 12GB" data-brand="Samsung" data-image="https://cdn.tgdd.vn/Products/Images/42/334930/samsung-galaxy-a36-5g-green-thumb-600x600.jpg" data-description="Samsung Galaxy A36 5G 12GB chính hãng" data-stock="12" style="text-align:center; margin-right:10px; cursor:pointer;">
        <div class="home-product-item__img" style="background-image:url(https://cdn.tgdd.vn/Products/Images/42/334930/samsung-galaxy-a36-5g-green-thumb-600x600.jpg); background-size:cover; border-radius:8px;"></div>
        <h4 class="home-product-item__name">Samsung Galaxy A36 5G 12GB</h4>
        <span class="home-product-item__price-current">9.410.000đ</span>
    </div>

    <div class="home-product-item" data-name="Samsung Galaxy S25 Ultra 5G" data-brand="Samsung" data-image="https://cdn.tgdd.vn/Products/Images/42/333347/samsung-galaxy-s25-ultra-blue-thumbai-600x600.jpg" data-description="Samsung Galaxy S25 Ultra 5G chính hãng" data-stock="5" style="text-align:center; margin-right:10px; cursor:pointer;">
        <div class="home-product-item__img" style="background-image:url(https://cdn.tgdd.vn/Products/Images/42/333347/samsung-galaxy-s25-ultra-blue-thumbai-600x600.jpg); background-size:cover; border-radius:8px;"></div>
        <h4 class="home-product-item__name">Samsung Galaxy S25 Ultra 5G</h4>
        <span class="home-product-item__price-current">27.480.000đ</span>
    </div>

    <div class="home-product-item" data-name="IPhone 15 256GB" data-brand="Apple" data-image="https://cdn.tgdd.vn/Products/Images/42/303716/iphone-15-hong-thumb-600x600.jpg" data-description="IPhone 15 256GB chính hãng" data-stock="10" style="text-align:center; margin-right:10px; cursor:pointer;">
        <div class="home-product-item__img" style="background-image:url(https://cdn.tgdd.vn/Products/Images/42/303716/iphone-15-hong-thumb-600x600.jpg); background-size:cover; border-radius:8px;"></div>
        <h4 class="home-product-item__name">IPhone 15 256GB</h4>
        <span class="home-product-item__price-current">20.990.000đ</span>
    </div>

    <div class="home-product-item" data-name="IPhone 14 128GB" data-brand="Apple" data-image="https://cdn.tgdd.vn/Products/Images/42/240259/iPhone-14-plus-thumb-xanh-600x600.jpg" data-description="IPhone 14 128GB chính hãng" data-stock="15" style="text-align:center; margin-right:10px; cursor:pointer;">
        <div class="home-product-item__img" style="background-image:url(https://cdn.tgdd.vn/Products/Images/42/240259/iPhone-14-plus-thumb-xanh-600x600.jpg); background-size:cover; border-radius:8px;"></div>
        <h4 class="home-product-item__name">IPhone 14 128GB</h4>
        <span class="home-product-item__price-current">13.990.000đ</span>
    </div>

    <div class="home-product-item" data-name="IPhone 15 Plus 256GB" data-brand="Apple" data-image="https://cdn.tgdd.vn/Products/Images/42/303823/iphone-15-plus-vang-256gb-thumb-600x600.jpg" data-description="IPhone 15 Plus 256GB chính hãng" data-stock="8" style="text-align:center; margin-right:10px; cursor:pointer;">
        <div class="home-product-item__img" style="background-image:url(https://cdn.tgdd.vn/Products/Images/42/303823/iphone-15-plus-vang-256gb-thumb-600x600.jpg); background-size:cover; border-radius:8px;"></div>
        <h4 class="home-product-item__name">IPhone 15 Plus 256GB</h4>
        <span class="home-product-item__price-current">22.590.000đ</span>
    </div>

    <div class="home-product-item" data-name="IPhone 16e 512GB" data-brand="Apple" data-image="https://cdn.tgdd.vn/Products/Images/42/334866/iphone-16e-trang-thumb-1-600x600.jpg" data-description="IPhone 16e 512GB chính hãng" data-stock="6" style="text-align:center; cursor:pointer;">
        <div class="home-product-item__img" style="background-image:url(https://cdn.tgdd.vn/Products/Images/42/334866/iphone-16e-trang-thumb-1-600x600.jpg); background-size:cover; border-radius:8px;"></div>
        <h4 class="home-product-item__name">IPhone 16e 512GB</h4>
        <span class="home-product-item__price-current">23.990.000đ</span>
    </div>
`;


        // Thêm sự kiện click cho các sản phẩm liên quan
        document.querySelectorAll("#related-products .home-product-item").forEach(relatedItem => {
            relatedItem.addEventListener("click", () => showProductDetail(relatedItem));
        });
    }

    // Click sản phẩm chính
    document.querySelectorAll(".home-product-item").forEach(item => {
        item.addEventListener("click", e => {
            e.preventDefault();
            showProductDetail(item);
        });
    });

    // Nút quay lại
    backBtn.addEventListener("click", () => {
        Array.from(document.body.children).forEach(el => el.style.display="");
        detailBox.style.display = "none";
        homeProduct.style.display = "block";
        categoryMenu.style.display = "block";
        breadcrumb.innerHTML = `<a href="#">Trang chủ</a>`;
        document.querySelectorAll("header, footer, .home-filter, .home-filter__classify").forEach(el => el.style.display="block");
    });

    // Thêm vào giỏ hàng
    addCartBtn.addEventListener("click", () => {
        let currentStock = parseInt(detailStock.textContent);
        if (currentStock > 0) {
            currentStock -= 1;
            detailStock.textContent = currentStock;

            const productItem = Array.from(document.querySelectorAll(".home-product-item"))
                                     .find(el => el.dataset.name === detailName.textContent);
            if (productItem) productItem.dataset.stock = currentStock;

            alert("Đã thêm vào giỏ hàng!");
        } else {
            alert("Sản phẩm đã hết hàng!");
        }
    });

    // Mua ngay
    document.querySelectorAll(".home-product-item__buy-btn").forEach(btn => {
        btn.addEventListener("click", () => {
            window.location.href = "checkout.html";
        });
    });
});
