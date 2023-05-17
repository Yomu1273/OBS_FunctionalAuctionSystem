function openUpdateForm(){
    document.getElementById("signupOverlay").style.display="block";
    document.getElementById("auctionUpdate").style.display="none";
    document.getElementById("recharge").style.display="none";
    document.getElementById("recentOrders").style.display="none";
    document.getElementById("wishList").style.display="none";
    document.getElementById("updateProfile").style.display="block";
    window.scrollBy(0,75);
}

function openAuctionForm(){
    document.getElementById("signupOverlay").style.display="block";
    document.getElementById("updateProfile").style.display="none";
    document.getElementById("recharge").style.display="none";
    document.getElementById("recentOrders").style.display="none";
    document.getElementById("wishList").style.display="none";
    document.getElementById("auctionUpdate").style.display="block";
    window.scrollBy(0,75);
}

function openRecharge(){
    document.getElementById("signupOverlay").style.display="block";
    document.getElementById("updateProfile").style.display="none";
    document.getElementById("recharge").style.display="block";
    document.getElementById("recentOrders").style.display="none";
    document.getElementById("wishList").style.display="none";
    document.getElementById("auctionUpdate").style.display="none";
    window.scrollBy(0,75);
}

function openRecentOrders(){
    document.getElementById("signupOverlay").style.display="block";
    document.getElementById("updateProfile").style.display="none";
    document.getElementById("recharge").style.display="none";
    document.getElementById("recentOrders").style.display="block";
    document.getElementById("wishList").style.display="none";
    document.getElementById("auctionUpdate").style.display="none";
    window.scrollBy(0,75);
}

function openWishList(){
    document.getElementById("signupOverlay").style.display="block";
    document.getElementById("updateProfile").style.display="none";
    document.getElementById("recharge").style.display="none";
    document.getElementById("recentOrders").style.display="none";
    document.getElementById("wishList").style.display="block";
    document.getElementById("auctionUpdate").style.display="none";
    window.scrollBy(0,75);
}

function closeForm(){
    document.getElementById("signupOverlay").style.display="none";
}