/*--------------------------------------------------
Template Name: Shopphone;

Author Name:Binh Le;
Author URI:;
Version: 1;
Note: b-main.js, ==>> main fuction.
-----------------------------------------------------*/

function alert(result){
    // var msg = result.data[0].keyData;
    var msgValue = result.data[0].valueData;
        alert(msgValue);
}


function errorMsg(err){
    $('#error-modal').modal("show");
    $('#error-modal-msg').text(err);
}

function okMsg(okmsg){
    $('#error-modal').modal("show");
    $('#error-modal-msg').text(okmsg);
}

function login() {
    console.log("run");
    console.log($("form").serialize());

    $.ajax({
        url: "/web/login",
        method: "POST",
        data: $("#login-form").serialize(),
        success: result => {
            processLoginData(result);
        },
        error: error => {
            console.log("error");
            alert('Lỗi hệ thống!!! ---> '+error);
        }
    });
}

function processLoginData(result) {
    var keyData = result.data[0].keyData;
    var screen = result.screen;
    $('#login-alert').empty();
    if (keyData == 'error') {
        $('#login-alert').text(result.data[0].valueData);
    } else {
        setTimeout(function(){
			window.location = screen;
		}, 500);
    }
    console.log(result);
};

$('#register').click(function( event ) {
    event.preventDefault();
    console.log("run");
    var fistName = $('#register-first-name').val();
    var lastName = $('#register-last-name').val();
    var address = $('#register-address').val();
    var email = $('#register-email').val();
    var phone = $('#register-phone').val();
    var pass = $('#register-pass').val();
    var confirmPass = $('#register-confirm-pass').val();

    if (fistName == '' || lastName == '' || address == '' || email == '' || phone == '' || pass == '' || confirmPass == '' ) {
        $('#register-msg').text('Bạn chưa nhập đủ thông tin.');
        return;
    }
    if (pass != confirmPass) {
        $('#register-msg').text('Xác nhận mật khẩu bạn nhập không trùng nhau.');
        return;
    }
    if (email.includes('@') == false) {
        $('#register-msg').text('Email bạn nhập chưa đúng.');
        return;
    }

    var dataLst = 'fistName=' + fistName;
    dataLst = dataLst + '&lastName=' + lastName;
    dataLst = dataLst + '&address=' + address;
    dataLst = dataLst + '&email=' + email;
    dataLst = dataLst + '&phone=' + phone;
    dataLst = dataLst + '&pass=' + pass;

    $.ajax({
        url: "/web/register",
        method: "POST",
        data: dataLst,
        success: result => {
            // alert(result);
            var msgKey = result.data[0].keyData;
            var msgValue = result.data[0].valueData;
            if (msgKey == 'error') {
                $('#register-msg').text(msgValue);
            }else {
                $('#register-msg').empty();
                $('#form-register').addClass('d-none');
                $('#form-register-success').removeClass('d-none');
                $('#form-register-success').addClass('d-flex');
            }
        },
        error: error => {
            console.log("error");
            alert('Lỗi hệ thống!!! ---> '+error);
        }
    });


});


function quickView(idProduct){
    var dataLst = "idProduct="+idProduct;
    $.ajax({
        url: "/web/quickView",
        method: "POST",
        data: dataLst,
        success: result => {
            processquickView(result);
           
        },
        error: error => {
            console.log("error");
            alert('Lỗi hệ thống!!! ---> '+error);
        }
    });
}

function processquickView(result){
    var keyData = result.data[0].keyData;

    if (keyData == "rstProduct") {
        valueData = result.data[0].valueData;
        $('#qv-name-product').text(valueData.name);
        $('#qv-price-product').text(valueData.price);
        $('#qv-description-product').text(valueData.description);
        $('#qv-add-cart').html(
            '<div class="col-md-6">'+
            '<button class="btn btn-warning qv-add-cart" type="submit" data-dismiss="modal" aria-label="Close" onclick="addCart(' + valueData.id_product + ');">Thêm vào giỏ</button>'+
            '</div>'+
            '<div class="col-md-6">'+
            '<a class="btn btn-success qv-add-cart" href="/web/single-product/'+ valueData.id_product +'" type="submit">Thanh toán</a>'+
            '</div>'
        );
        $('#qv-image').html(
            '<img src="'+ valueData.image +'" alt="product image">'
        );
    }
}

function addCart(idProduct){
    var numProduct = $('#quantity-product').val();
    var dataLst = "idProduct="+idProduct+"&numProduct="+numProduct;

    $.ajax({
        url: "/web/addCart",
        method: "POST",
        data: dataLst,
        success: result => {
            processCartData(result);
            addCartInMinicart();
           
        },
        error: error => {
            console.log("error");
            alert('Lỗi hệ thống!!! ---> '+error);
        }
    });

}

function processCartData(result){
    var keyData = result.data[0].keyData;

    if (keyData == "rstCartTotal") {
        valueData = result.data[0].valueData;
        $('#cart-badge-num-product').text(valueData);
    }
    
}
    // Pay cart
function toPay(idP){
    addCart(idP);
    window.location.assign("/web/checkout")
}


function addCartInMinicart(){


    $.ajax({
        url: "/web/getCart",
        method: "POST",
        // data: dataLst,
        success: result => {
            processGetCartData(result);
           
        },
        error: error => {
            console.log("error");
            alert('Lỗi hệ thống!!! ---> '+error);
        }
    });
};

function processGetCartData(result){
    $('#minicart-content').empty();

    if (result.data[0].keyData == "LstCart") {
        var lstC = result.data[0].valueData;
        for (let i = 0; i < lstC.length; i++) {
            $('#minicart-content').append(
                '<li>'+
                    '<a href="single-product.html" class="minicart-product-image">'+
                        '<img src="' + lstC[i].image_product + '" alt="cart products">'+
                    '</a>'+
                    '<div class="minicart-product-details">'+
                        '<h6><a href="single-product.html">' + lstC[i].name_product + '</a></h6>'+
                        '<span class="price">' + lstC[i].price_product + '</span><span> x ' + lstC[i].num_product + '</span>'+
                    '</div>'+
                    '<button class="close" title="Remove">'+
                        '<i class="fa fa-close"></i>'+
                    '</button>'+
                '</li>'
            )
        }
        result.data[1].keyData == "TotalMoney"  ?   $('#minicart-total').text(result.data[1].valueData) : "0";

        $('#cart-badge-num-product').text(lstC.length);

        convertPrice();

    }

}


function goOrder(){
    $('.go-order-msg').empty();
    var cusName = $('#checkout_cus_name').val();
    var cusAddress = $('#checkout_cus_address').val();
    var cusEmail = $('#checkout_cus_email').val();
    var cusPhone = $('#checkout_cus_phone').val();
    var cusNote = $('#checkout_note').val();
    var checkoutCod = $('#checkout_note').val();    
    if (cusName == "" || cusAddress == "" || cusEmail == "" || cusPhone == "") {
        $('.go-order-msg').text('Bạn phải nhập đầy đủ thông tin địa chỉ!')

        return;
    }

    window.scrollTo(0,0);
    watingModal("show");

    var dataLst = "cusName="+cusName+"&cusAddress="+cusAddress+"&cusEmail="+cusEmail+"&cusPhone="+cusPhone+"&cusNote="+cusNote;

    $.ajax({
        url: "/web/goorder",
        method: "POST",
        data: dataLst,
        success: result => {
            processGoOrderData(result);
           
        },
        error: error => {
            console.log("error");
            alert('Lỗi hệ thống!!! ---> '+error);
        }
    });


}


function processGoOrderData(result){
 watingModal("hide");
 var data = result.data;
 var msg = "";
 for (let i = 0; i < data.length; i++) {
    if (data[i].keyData == "error") {
        errorMsg(data[i].valueData);
        return;
    } 
    if(data[i].keyData == "idCheckOut"){
        msg = data[i].valueData;
    }
     
 }
  
    $('#checkOutId').text(msg);
    $('#checkOutModel').modal("show");
}


function watingModal(status){
    switch (status) {
        case "show":
            $('.waiting-modal').removeClass('d-none');
            break;
            
        case "hide":
            $('.waiting-modal').addClass('d-none');
            break;
        default:
            break;
    }
   
}





























// ================================================ADMIN=======================================

$('#insert-product-btn').click(function(e){
    e.preventDefault();
    $('#admin-insert-product-msg').empty();


    var 
        type = $('#type').val(),
        name = $('#name').val(),
        id_promotion = $('#id_promotion').val(),
        inventory = $('#inventory').val(),
        producer = $('#producer').val(),
        ram = $('#ram').val(),
        cpu = $('#cpu').val(),
        monitor = $('#monitor').val(),
        system = $('#system').val(),
        color = $('#color').val(),
        rom = $('#rom').val(),
        font_camera = $('#font_camera').val(),
        back_camera = $('#back_camera').val(),
        battery = $('#battery').val(),
        image = $('#image').val(),
        sell_quantity = $('#sell_quantity').val(),
        description = $('#description').val(),
        rate = $('#rate').val(),
        entry_price = $('#entry_price').val(),
        price = $('#price').val();



    var data = "type=" + type;

    data = data + "&name="+name;
    data = data + "&id_promotion="+id_promotion;
    data = data + "&inventory="+inventory;
    data = data + "&producer="+producer;
    data = data + "&ram="+ram;
    data = data + "&cpu="+cpu;
    data = data + "&monitor="+monitor;
    data = data + "&system="+system;
    data = data + "&color="+color;
    data = data + "&rom="+rom;
    data = data + "&font_camera="+font_camera;
    data = data + "&back_camera="+back_camera;
    data = data + "&battery="+battery;
    data = data + "&image="+image;
    data = data + "&sell_quantity="+sell_quantity;
    data = data + "&description="+description;
    data = data + "&rate="+rate;
    data = data + "&entry_price="+entry_price;
    data = data + "&price="+price;

    // var data = "product=" +product;

    $.ajax({
        url: "/web/insert-product",
        method: "POST",
        data: data,
        success: result => {
            // alert(result);
            var msgKey = result.data[0].keyData;
            var msgValue = result.data[0].valueData;
            if (msgKey == 'error') {
                $('#admin-insert-product-msg').text(msgValue);
                $('#admin-insert-product-msg').addClass('text-danger');
                $('#admin-insert-product-msg').removeClass('text-success');
            }else {
                $('#admin-insert-product-msg').text(msgValue);
                $('#admin-insert-product-msg').addClass('text-success');
                $('#admin-insert-product-msg').removeClass('text-danger');
                $('#insert-product')[0].reset();
            }
        },
        error: error => {
            console.log("error");
            alert('Lỗi hệ thống!!! ---> '+error);
        }
    });


})

function onLoadIndex(){
        // let prices = $('.price');
    
        // for (let p of prices){
        //     let value = p.innerText;
        //     value = value.replace(/\s+/g, '');
        //     value = value.replace(/[.]+/g, '');
        //     let arr = value.split('');
        //     let res = "";
        //     for (let i = arr.length - 1; i >= 0; i --)
        //         res = ((i && (arr.length - i)%3 == 0)?".":"") + arr[i] + res;
        //     p.innerText = res;
        // }
        setInterval(onloadCheckout, 1000);
    
}

$('#admin-crud-product').click(function (){

    $.ajax({
        url: "/web/CRUDShowProduct",
        method: "POST",
        success: result => {
            processCRUDShowProduct(result);
        },
        error: error => {
            console.log("error");
            alert('Lỗi hệ thống!!! ---> '+error);
        }
    })
});

function processCRUDShowProduct(result){
    $('#admin-product-list').empty();
    if (result.data[0].keyData == "lstProduct") {
        var lstP = result.data[0].valueData;
        for (let i = 0; i < lstP.length; i++) {





           $('#admin-product-list').append(
                        '<div class="col-lg-3 mt-15">'+
                            '<div class="single-product-wrap">'+
                                '<div class="product-image">'+
                                    '<a>'+
                                        '<img src="'+ lstP[i].image +'">'+
                                    '</a>'+
                                    '<span class="sticker">New</span>'+
                                '</div>'+
                                '<div class="product_desc">'+
                                    '<div class="product_desc_info">'+
                                        '<div class="product-review">'+
                                            '<h5 class="manufacturer">'+
                                                '<a href="shop-left-sidebar">'+ lstP[i].producer +'</a>'+
                                            '</h5>'+
                                            '<div class="rating-box">'+
                                                '<ul class="rating">'+
                                                    '<li><i class="fa fa-star-o"></i></li>'+
                                                    '<li><i class="fa fa-star-o"></i></li>'+
                                                    '<li><i class="fa fa-star-o"></i></li>'+
                                                    '<li class="no-star"><i class="fa fa-star-o"></i></li>'+
                                                    '<li class="no-star"><i class="fa fa-star-o"></i></li>'+
                                                '</ul>'+
                                            '</div>'+
                                        '</div>'+
                                        '<h4><div class="product_name">'+ lstP[i].name +'</div></h4>'+
                                        '<div class="price-box">'+
                                            '<span class="new-price price">$</span>'+ lstP[i].priceD +' <small>VND</small>'+
                                        '</div>'+
                                    '</div>'+
                                    '<div class="add-actions">'+
                                        '<ul class="add-actions-link li-cursor-pointer">'+
                                            '<li class="add-cart active cursor-pointer" data-toggle="modal" data-target="#exampleModalCenter" onclick="adminCRUDEdit('+ lstP[i].id_product +');"><span>CHỈNH SỬA</span></li>'+
                                        '</ul>'+
                                    '</div>'+
                                '</div>'+
                            '</div>'+
                        '</div>'

           )
        }
      
    }
    
};


function adminCRUDEdit(idProduct){
var dataLst = "idProduct=" + idProduct;

    $.ajax({
        url: "/web/admin-get-product",
        method: "POST",
        data: dataLst,
        success: result => {
            processAdminCRUDEdit(result);
        },
        error: error => {
            console.log("error");
            alert('Lỗi hệ thống!!! ---> '+error);
        }
    })



}

function processAdminCRUDEdit(result){
    $('#admin-modal-body').empty();
    $('#admin-modal-title').empty();
    if (result.data[0].keyData == "rstProduct") {


    var product = result.data[0].valueData;


    $('#admin-modal').modal("show");
    $('#admin-modal-title').text(product.name);
    $('#admin-modal-body').html(
        '<input id="productName" type="text" value="' + product.name +'"/>'+
        '<input id="productType" type="text" value="' + product.type +'"/>'+
        '<input id="productId_promotion" type="text" value="' + product.id_promotion +'"/>'+
        '<input id="productInventory" type="text" value="' + product.inventory +'"/>'+
        '<input id="productProducer" type="text" value="' + product.producer +'"/>'+
        '<input id="productRam" type="text" value="' + product.ram +'"/>'+
        '<input id="productCpu" type="text" value="' + product.cpu +'"/>'+
        '<input id="productMonitor" type="text" value="' + product.monitor +'"/>'+
        '<input id="productSystem" type="text" value="' + product.system +'"/>'+
        '<input id="productColor" type="text" value="' + product.color +'"/>'+
        '<input id="productRom" type="text" value="' + product.rom +'"/>'+
        '<input id="productFontCamera" type="text" value="' + product.font_camera +'"/>'+
        '<input id="productBattery" type="text" value="' + product.battery +'"/>'+
        '<input id="productImage" type="text" value="' + product.image +'"/>'+
        '<input id="productSellQuantity" type="text" value="' + product.sell_quantity +'"/>'+
        '<input id="productDescription" type="text" value="' + product.description +'"/>'+
        '<input id="productRate" type="text" value="' + product.rate +'"/>'+
        '<input id="productEntryPrice" type="text" value="' + product.entry_price +'"/>'+
        '<input id="productPrice" type="text" value="' + product.price +'"/>'
    );


    $('#modal-dialog-footer').html(
        '<button type="button" class="btn btn-secondary" data-dismiss="modal">Close</button>'+
        '<button type="button" class="btn btn-primary" onclick="adminCRUDEditConfirm('+product.id_product+');">Xác nhận</button>'+
        '<button type="button" class="btn btn-danger" onclick="adminCRUDDeleteConfirm('+product.id_product+');">Xoá sản phẩm</button>'
    )
    }

};

function adminCRUDEditConfirm(idProduct) {
    var productName = $('#productName').val();
    var productType = $('#productType').val();
    var productId_promotion = $('#productId_promotion').val();
    var productInventory = $('#productInventory').val();
    var productProducer = $('#productProducer').val();
    var productRam = $('#productRam').val();
    var productCpu = $('#productCpu').val();
    var productMonitor = $('#productMonitor').val();
    var productSystem = $('#productSystem').val();
    var productColor = $('#productColor').val();
    var productRom = $('#productRom').val();
    var productFontCamera = $('#productFontCamera').val();
    var productBattery = $('#productBattery').val();
    var productImage = $('#productImage').val();
    var productSellQuantity = $('#productSellQuantity').val();
    var productDescription = $('#productDescription').val();
    var productRate = $('#productRate').val();
    var productEntryPrice = $('#productEntryPrice').val();
    var productPrice = $('#productPrice').val();





    var dataLst = "idProduct=" + idProduct + "&productName=" + productName + "&productType=" + productType + "&productId_promotion=" + productId_promotion + "&productInventory=" + productInventory + 
        "&productProducer=" + productProducer + "&productRam=" + productRam  + "&productCpu=" + productCpu + "&productMonitor=" + productMonitor + 
        "&productSystem=" + productSystem + "&productColor=" + productColor  + "&productRom=" + productRom + "&productFontCamera=" + productFontCamera + 
        "&productBattery=" + productBattery + "&productImage=" + productImage  + "&productSellQuantity=" + productSellQuantity + "&productDescription=" + productDescription + 
        "&productRate=" + productRate + "&productEntryPrice=" + productEntryPrice  + "&productPrice=" + productPrice;

    $.ajax({
        url: "/web/admin-edit-product",
        method: "POST",
        data: dataLst,
        success: result => {
            processMsg(result);
            $('#admin-modal').modal("hide");

            setTimeout(() => {
                window.location.assign("/web/index");

            }, 1000);

        },
        error: error => {
            console.log("error");
            alert('Lỗi hệ thống!!! ---> '+error);
        }
    })
}

function adminCRUDDeleteConfirm(idProduct) {
    var dataLst = "idProduct=" + idProduct;

    $.ajax({
        url: "/web/admin-delete-product",
        method: "POST",
        data: dataLst,
        success: result => {
            processMsg(result);
            $('#admin-modal').modal("hide");
            setTimeout(() => {
                window.location.assign("/web/index");
            }, 1000);

        },
        error: error => {
            console.log("error");
            alert('Lỗi hệ thống!!! ---> '+error);
        }
    })
    
}



function processMsg(result) {

    watingModal("hide");
    var data = result.data;
    var msg = "";
    for (let i = 0; i < data.length; i++) {
       if (data[i].keyData == "error") {
           errorMsg(data[i].valueData);
           return;
       } 
       if(data[i].keyData == "success"){
            okMsg(data[i].valueData);
       }
        
    }
}

//--------------------------------------------------------------
function convertPrice(){
    let prices = $('.price');

    for (let p of prices){
        let value = p.innerText;
        value = value.replace(/\s+/g, '');
        value = value.replace(/[.]+/g, '');
        let arr = value.split('');
        let res = "";
        for (let i = arr.length - 1; i >= 0; i --)
            res = ((i && (arr.length - i)%3 == 0)?".":"") + arr[i] + res;
        p.innerText = res;
    
};
}

function onloadCheckout(){
    let prices = $('.price');

    for (let p of prices){
        let value = p.innerText;
        value = value.replace(/\s+/g, '');
        value = value.replace(/[.]+/g, '');
        let arr = value.split('');
        let res = "";
        for (let i = arr.length - 1; i >= 0; i --)
            res = ((i && (arr.length - i)%3 == 0)?".":"") + arr[i] + res;
        p.innerText = res;
    
};
}
