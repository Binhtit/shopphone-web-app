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
    var numProduct = 1
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
                        '<span>' + lstC[i].price_product + ' x ' + lstC[i].num_product + '</span>'+
                    '</div>'+
                    '<button class="close" title="Remove">'+
                        '<i class="fa fa-close"></i>'+
                    '</button>'+
                '</li>'
            )
        }
        $('#cart-badge-num-product').text(lstC.length);
    }

}

function goOrder(){
    var cusName = $('#checkout_cus_name').val();
    var cusAddress = $('#checkout_cus_address').val();
    var cusEmail = $('#checkout_cus_email').val();
    var cusPhone = $('#checkout_cus_phone').val();
    var cusNote = $('#checkout_note').val();

    var dataLst = "cusName="+cusName+"&cusAddress="+cusAddress+"&cusEmail="+cusEmail+"&cusPhone="+cusPhone+"&cusNote="+cusNote;

    $.ajax({
        url: "/web/goorder",
        method: "POST",
        data: dataLst,
        success: result => {
            processGetCartData(result);
           
        },
        error: error => {
            console.log("error");
            alert('Lỗi hệ thống!!! ---> '+error);
        }
    });

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
    
}

$('#admin-crud-product').click(function (){

    $.ajax({
        url: "/web/CRUDProduct",
        method: "POST",
        success: result => {
            processCRUDProduct(result);
        },
        error: error => {
            console.log("error");
            alert('Lỗi hệ thống!!! ---> '+error);
        }
    })
});

function processCRUDProduct(result){
    $('#admin-list-produc-tbody').empty();
    if (result.data[0].keyData == "lstProduct") {
        var lstP = result.data[0].valueData;
        for (let i = 0; i < lstP.length; i++) {
           $('#admin-list-produc-tbody').append(
                '<tr>' +
                '<td scope="row" class="id-product"><span class=" row-id-' + lstP[i].id_product + ' ">'+ lstP[i].id_product +'</span></td>' + 
                '<td scope="row" class="id-product"><textarea class="d-none row-id-' + lstP[i].id_product + ' ">'+ lstP[i].id_product +'</textarea></td>' + 

                '<td scope="row" class="id-product"><span class=" row-id-' + lstP[i].id_product + ' ">'+ lstP[i].type +'</span></td>' +
                '<td scope="row" class="id-product"><textarea class="d-none row-id-' + lstP[i].id_product + ' ">'+ lstP[i].type +'</textarea></td>' +

                '<td class="name"><span class=" row-id-' + lstP[i].id_product + ' ">'+ lstP[i].name + '</span></td>' +
                '<td class="name"><textarea class="d-none row-id-' + lstP[i].id_product + ' ">'+ lstP[i].name + '</textarea></td>' +

                '<td class="id-promotion"><span class=" row-id-' + lstP[i].id_product + ' ">'+ lstP[i].id_promotion + '</span></td>' +
                '<td class="id-promotion"><textarea class="d-none row-id-' + lstP[i].id_product + ' ">'+ lstP[i].id_promotion + '</textarea></td>' +

                '<td class="inventory"><span class=" row-id-' + lstP[i].id_product + ' ">'+ lstP[i].inventory + '</span></td>' +
                '<td class="inventory"><textarea class="d-none row-id-' + lstP[i].id_product + ' ">'+ lstP[i].inventory + '</textarea></td>' +

                '<td class="producer"><span class=" row-id-' + lstP[i].id_product + ' ">'+ lstP[i].producer + '</span></td>' +
                '<td class="producer"><textarea class="d-none row-id-' + lstP[i].id_product + ' ">'+ lstP[i].producer + '</textarea></td>' +

                '<td class="ram"><span class=" row-id-' + lstP[i].id_product + ' ">'+ lstP[i].ram + '</span></td>' +
                '<td class="ram"><textarea class="d-none row-id-' + lstP[i].id_product + ' ">'+ lstP[i].ram + '</textarea></td>' +

                '<td class="cpu"><span class=" row-id-' + lstP[i].id_product + ' ">'+ lstP[i].cpu + '</span></td>' +
                '<td class="cpu"><textarea class="d-none row-id-' + lstP[i].id_product + ' ">'+ lstP[i].cpu + '</textarea></td>' +

                '<td class="monitor"><span class=" row-id-' + lstP[i].id_product + ' ">'+ lstP[i].monitor + '</span></td>' +
                '<td class="monitor"><textarea class="d-none row-id-' + lstP[i].id_product + ' ">'+ lstP[i].monitor + '</textarea></td>' +

                '<td class="system"><span class=" row-id-' + lstP[i].id_product + ' ">'+ lstP[i].system + '</span></td>' +
                '<td class="system"><textarea class="d-none row-id-' + lstP[i].id_product + ' ">'+ lstP[i].system + '</textarea></td>' +

                '<td class="color"><span class=" row-id-' + lstP[i].id_product + ' ">'+ lstP[i].color + '</span></td>' +
                '<td class="color"><textarea class="d-none row-id-' + lstP[i].id_product + ' ">'+ lstP[i].color + '</textarea></td>' +

                '<td class="rom"><span class=" row-id-' + lstP[i].id_product + ' ">'+ lstP[i].rom + '</span></td>' +
                '<td class="rom"><textarea class="d-none row-id-' + lstP[i].id_product + ' ">'+ lstP[i].rom + '</textarea></td>' +

                '<td class="font-camera"><span class=" row-id-' + lstP[i].id_product + ' ">'+ lstP[i].font_camera + '</span></td>' +
                '<td class="font-camera"><textarea class="d-none row-id-' + lstP[i].id_product + ' ">'+ lstP[i].font_camera + '</textarea></td>' +
                
                '<td class="back-camera"><span class=" row-id-' + lstP[i].id_product + ' ">'+ lstP[i].back_camera + '</span></td>' +
                '<td class="back-camera"><textarea class="d-none row-id-' + lstP[i].id_product + ' ">'+ lstP[i].back_camera + '</textarea></td>' +

                '<td class="battery"><span class=" row-id-' + lstP[i].id_product + ' ">'+ lstP[i].battery + '</span></td>' +
                '<td class="battery"><textarea class="d-none row-id-' + lstP[i].id_product + ' ">'+ lstP[i].battery + '</textarea></td>' +

                '<td class="image"><span class=" row-id-' + lstP[i].id_product + ' ">'+ lstP[i].image + '</span></td>' +
                '<td class="image"><textarea class="d-none row-id-' + lstP[i].id_product + ' ">'+ lstP[i].image + '</textarea></td>' +

                '<td class="sell-quantity"><span class=" row-id-' + lstP[i].id_product + ' ">'+ lstP[i].sell_quantity + '</span></td>' +
                '<td class="sell-quantity"><textarea class="d-none row-id-' + lstP[i].id_product + ' ">'+ lstP[i].sell_quantity + '</textarea></td>' +

                '<td class="description"><span class=" row-id-' + lstP[i].id_product + ' ">'+ lstP[i].description + '</span></td>' +
                '<td class="description"><textarea class="d-none row-id-' + lstP[i].id_product + ' ">'+ lstP[i].description + '</textarea></td>' +

                '<td class="rate"><span class=" row-id-' + lstP[i].id_product + ' ">'+ lstP[i].rate + '</span></td>' +
                '<td class="rate"><textarea class="d-none row-id-' + lstP[i].id_product + ' ">'+ lstP[i].rate + '</textarea></td>' +

                '<td class="entry-price"><span class=" row-id-' + lstP[i].id_product + ' ">'+ lstP[i].entry_price + '</span></td>' +
                '<td class="entry-price"><textarea class="d-none row-id-' + lstP[i].id_product + ' ">'+ lstP[i].entry_price + '</textarea></td>' +

                '<td class="price"><span class=" row-id-' + lstP[i].id_product + ' ">'+ lstP[i].price + '</span></td>' +
                '<td class="price"><textarea class="d-none row-id-' + lstP[i].id_product + ' ">'+ lstP[i].price + '</textarea></td>' +

                '<td class=""> <input onclick="CrudEedit(' + lstP[i].id_product + ');" type="button" value="Chỉnh sửa" /> <input style="margin-left: 10px;" onclick="CrudDelete(' + lstP[i].id_product + ');" type="button" value="Xoá" /></td>' +
                '</tr>'
           ); 
        }
      
    }
    
};

function CrudEedit(id_product){
    $('textarea.row-id-'+id_product).removeClass('d-none');
    $('span.row-id-'+id_product).addClass('d-none');

};


function onloadCheckout(){
    
}
