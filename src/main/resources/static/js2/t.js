
/////////////////////////////////////// COMMON //////////////////////////////////
var WEB_V1_LOGIN = "/web/v1/login";
var WEB_V1_GET_ACCEPT_ORDER_DETAIL = "/web/v1/get_accept_order_detail";
var WEB_V1_REJECT_ORDER = "/web/v1/reject_order";
var WEB_V1_ACCEPT_ORDER = "/web/v1/accept_order";
var WEB_V1_GET_ACCEPTED_CANCEL_ORDER_DETAIL = "/web/v1/get_accepted_cancel_order_detail";
var WEB_V1_GET_ORDERED = "/web/v1/get_ordered";
var WEB_V1_GET_ORDERED_DETAIL = "/web/v1/get_ordered_detail";
var WEB_V1_CREATE_RETURN_ORDER_AND_REORDER = "/web/v1/create_return_order_and_reorder";
var WEB_V1_ADD_INVENTORY_ITEM_CATEGORY = "/web/v1/add_inventory_category";
var WEB_V1_DELETE_INVENTORY_ITEM_CATEGORY = "/web/v1/delete_inventory_category";
var WEB_V1_ADD_UNIT = "/web/v1/add_unit";
var WEB_V1_ADD_INVENTORY_ITEM = "/web/v1/add_inventory";
var WEB_V1_ADD_PRICE_HISTORY = "/web/v1/add_price_history";
var WEB_V1_ADD_PRICE = "/web/v1/add_price";
var WEB_V1_ADD_PRICE_APPLY = "/web/v1/add_price_apply";
var WEB_V1_ORDER = "/web/v1/order";
var WEB_V1_GET_ORDER_LIST_DETAIL = "/web/v1/order_list_detail";
var WEB_V1_ORDER_RECEIVED = "/web/v1/order_received";
var WEB_V1_GET_WAREHOUSE_DETAIL = "/web/v1/get_warehouse_detail";
var WEB_V1_REQUEST_RAW_DATA = "/web/v1/request_raw_data";
var WEB_V1_GET_PG_NA = "/web/v1/get_pg_na";
var WEB_V1_GET_SHIFT = "/web/v1/get_shift";
var WEB_V1_GET_RETURN_PROMOTION_INVENTORY_ITEM = "/web/v1/get_return_promotion_inventory_item";
var WEB_V1_RETURN_PROMOTION = "/web/v1/return_promotion";
var WEB_V1_GET_RETURN_PROMOTION_DETAIL = "/web/v1/get_return_promotion_detail";
var WEB_V1_GET_STAFF = "/web/v1/get_staff";
var WEB_V1_UPDATE_STAFF = "/web/v1/update_staff";
var WEB_V1_GET_INFO_FOR_ADD_SALE_PG_NA = "/web/v1/get_info_for_add_sale_pg_na";
var WEB_V1_GET_PG = "/web/v1/get_pg";
var WEB_V1_CREATE_PG_NA_2 = "/web/v1/create_pg_na_2";
var WEB_V1_GET_PG_NA_2 = "/web/v1/get_pg_na_2";
var WEB_V1_CHANGE_STATE = "/web/v1/change_state";
var WEB_V1_REQUEST_RAW_DATA_PGNA_SHIFT = "/web/v1/request_raw_data_pgna_shift";
var WEB_V1_ACCOUNT_STATUS_CHANGE = "/web/v1/account_status_change";
var WEB_V1_GET_SALE = "/web/v1/get_sale";
var WEB_V1_CREATE_SALEMAN_2 = "/web/v1/create_saleman_2";
var WEB_V1_GET_LIQUIDATION_STATUS_DISTRIBUTOR = '/web/v1/get_liquidation_status_distributor';
var WEB_V1_REGISTER_LIQUIDATION = '/web/v1/register_liquidation';
var WEB_V1_FINISH_LIQUIDATION_PROCESS = "/web/v1/finish_liquidation_process";
var WEB_V1_SUSPENDED_DIS = "/web/v1/suspended_dis";
var WEB_V1_ADD_NEW_DISTRIBUTOR_LIQUIDATION_PROCESS = "/web/v1/add_new_distributor_liquidation_process";
var WEB_V1_SHOW_FINISH_LIQUIDATION = "/web/v1/show_finish_liquidation";
var WEB_V1_ORDER_RECEIVED2 = "/web/v1/order_received2";
var WEB_V1_VIEW_SELL_IN = "/web/v1/view_sell_in";



var POST = "POST";
var DANGER = 'danger';
var SUCCESS = 'success';

var ORDER_STATUS_ORDERED = 1;
var ORDER_STATUS_APPROVED = 2;
var ORDER_STATUS_REJECT = 3;
var ORDER_STATUS_RECEIVED_GOOD = 4;

var SHOP_RADIUS = 450;
var MAP_ZOOM = 15;

var LIQUIDATION_NONE = 0;
var LIQUIDATION_PROCESSING = 1;
var LIQUIDATION_FINISH = 2;

var CHAR_INFINITY = '∞';

var StringUtil = {

    EMPTY: '',

    isEmpty: function(str) {
        if(str == null || str == '') return true;
        else return false;
    },

    isNotEmpty: function(str) {
        return !StringUtil.isEmpty(str);
    }
};

$(document).ready(() => {

	/*$("#login-passwd").keypress(e => {
	    if (e.which == 13) {
	    		loginweb();
	    }
	});
	
	$("#login-email").keypress(e => {
	    if (e.which == 13) {
	    		loginweb();
	    }
	});*/

});

function notify(msg, status) {
	UIkit.notification({message: msg, status: status, timeout: 7000});
}

//use for POST
function processData(result){
	var dataLst = result.data;
	var i = 0;
	for(i = 0;i < dataLst.length;i++){
		var data = dataLst[i];
		var actionKey = data.actionKey;
		var actionValue = data.actionValue;
		var id = data.idElement;

		processDataCommon(actionKey, actionValue, id);
	}
}

//use for GET
function processData2(cmdArr){
	var dataLst = cmdArr;
	var i = 0;
	for(i = 0;i < dataLst.length;i++){
		var data = dataLst[i];
		var actionKey = data.actionKey;
		var actionValue = data.actionValue;
		var id = data.idElement;

		processDataCommon(actionKey, actionValue, id);
	}
}

function processDataCommon(actionKey, actionValue, id){

	if('showError' == actionKey){
		notify(actionValue, 'danger');
	} else if('showSuccess' == actionKey){
		notify(actionValue, 'success');
	} else if('innerHtml' == actionKey){
		$("#" + id).html(actionValue);
	} else if('removeClass' == actionKey){
		$("#" + id).removeClass(actionValue);
	} else if('addClass' == actionKey){
		$("#" + id).addClass(actionValue);
	} else if('removeClassDelay' == actionKey){
		setTimeout(removeClassDelay,500, id, actionValue);
	} else if('transition' == actionKey){
		setTimeout(function(){
			window.location = actionValue;
		}, 700);
		
	} else if('localStorage' == actionKey){
		var localStorageLst = JSON.parse(actionValue);
		for(let i = 0; i < localStorageLst.length; i++){
			var localStorageRow = localStorageLst[i];
			localStorage.setItem(localStorageRow.key, localStorageRow.value);
		}
	}
}

function removeClassDelay(id, actionValue){
	$("#" + id).removeClass(actionValue);
}


function logout() {
	for (var it in $.cookie()) $.removeCookie(it);
	//document.cookie.split(";").forEach(function(c) { document.cookie = c.replace(/^ +/, "").replace(/=.*/, "=;expires=" + new Date().toUTCString() + ";path=/"); });
	//document.cookie = "enc_token=";
	window.location = "/";
}

function onLoad(){

	var cmdArrStr = $('#cmdArr').val();
	if(StringUtil.isEmpty(cmdArrStr)) return;

	var cmdArr = JSON.parse(cmdArrStr);
	processData2(cmdArr);

}

function removeLastChars(str){
	return str.substring(0, str.length - 1);
}

function createYesNoModal(title, content, callbackOKbtn){
	$("#modal-yes-no-title").html(title);
	$("#modal-yes-no-content").html(content);
	$("#modal-yes-no-okbtn").off("click");
	$("#modal-yes-no-okbtn").click(() => {
		UIkit.modal("#modal-yes-no").hide();
		callbackOKbtn();
	});
	var modal = $("#modal-yes-no");
	modal.show = () => {
		UIkit.modal("#modal-yes-no").show();
	}
	return modal;
}

function formatCurrency(num){
	var numTxt = num.toString();
	
	var result = '';
	
	var dotIndex = 0;
	for(let i = numTxt.length - 1; i >=0; i--){
		
		dotIndex++;
		
		if(dotIndex % 3 == 0 && i > 0){
			result =  '.' + numTxt[i] + result;
		} else {
			result = numTxt[i] + result;
		}

	}
	
	return result;
}

var GREEN_DOT = 'http://maps.google.com/mapfiles/ms/icons/green-dot.png';
var RED_DOT = 'http://maps.google.com/mapfiles/ms/icons/red-dot.png';

function placeMarker2(map, location, icon) {
    var marker = new google.maps.Marker({
        position: location,
        map: map,
        icon: icon
    });

    return marker;

}

function initMap(){

}









/////////////////////////////////////// s00200_login.html //////////////////////////////////

function loginweb(){
	
	$("#btn-ok").addClass('display-none');
	
	var email = $("#login-email").val();
	var passwd = $("#login-passwd").val();
	if(StringUtil.isEmpty(email) || StringUtil.isEmpty(passwd)){
		notify('Email hoặc mật khẩu trống!', DANGER);
		return;
	}

	$.ajax({
		url: WEB_V1_LOGIN,
		method : POST,
		data : $("form").serialize(),
		success: result => {
			$("#btn-ok").removeClass('display-none');
			UIkit.modal("#waiting-modal").hide();
			processData(result);
		},
		error: error => {
			$("#btn-ok").removeClass('display-none');
			UIkit.modal("#waiting-modal").hide();
			notify('Hệ thống lỗi, vui lòng thử lại sau...', DANGER);
		}
	});
	
	//$("form").submit();
}



/////////////////////////////////////// s01101_order_accept.html //////////////////////////////////
var isShowOrderDetailModal = false;
function acceptOrderShowDetail(idOrder) {

	isShowOrderDetailModal = false;
	$.ajax({
		url: WEB_V1_GET_ACCEPT_ORDER_DETAIL,
		method : POST,
		data : "idOrder="+idOrder,
		success: result => {
			
			processDataOrderAccept(result);
			UIkit.modal("#waiting-modal").hide();
			if(isShowOrderDetailModal){
				UIkit.modal("#order-detail-modal").show();
			}
		},
		error: error => {
			UIkit.modal("#waiting-modal").hide();
			notify('Hệ thống lỗi, vui lòng thử lại sau...', DANGER);
		}
	});
}


function processDataOrderAccept(result){
	var dataLst = result.data;
	var q = 0;
	for(q = 0;q < dataLst.length;q++){
		var data = dataLst[q];
		var actionKey = data.actionKey;
		var actionValue = data.actionValue;
		var id = data.idElement;

		if(actionKey == 'dataLst'){
			//get data
			var order = actionValue[0];
			var orderDetail = actionValue[1];
			var orderPromotionDetail = actionValue[2];
			var orderPromotion = actionValue[3];
			var warehouse = actionValue[4];
			var orderUser = actionValue[5];
			var whv = actionValue[6];
			
			//set whv
			$("#whv").val(whv);
			
			// generate inventory name
			var inventoryNames = {};
			for(let ii = 0; ii < orderDetail.length; ii++){
				inventoryNames[orderDetail[ii].id_inventory_item] = orderDetail[ii].name_inventory_item;
			}
			for(let ii = 0; ii < orderPromotionDetail.length; ii++){
				inventoryNames[orderPromotionDetail[ii].id_inventory_item] = orderPromotionDetail[ii].name_inventory_item;
			}
			//generate orderDetailMap
			var orderDetailMap = {};
			for(let ii = 0; ii < orderDetail.length; ii++){
				orderDetailMap[orderDetail[ii].id_inventory_item] = orderDetail[ii];
			}
			//generate orderPromotionDetailMap
			var orderPromotionDetailMap = {};
			for(let ii = 0; ii < orderPromotionDetail.length; ii++){
				orderPromotionDetailMap[orderPromotionDetail[ii].id_inventory_item] = orderPromotionDetail[ii];
			}
			//set code order
			$("#order-detail-modal-head").html(order.code_order);
			//empty previous data
			$("#order-detail-modal-body").empty();
			//compare inventory of order and warehouse
			if(compareOrderWarehouseItem(orderDetail, orderPromotionDetail, warehouse) > 0){
				$("#order-detail-modal-body").append("<input id='order-detail-modal-body-compare' type='hidden' value='1'/>");
			} else {
				$("#order-detail-modal-body").append("<input id='order-detail-modal-body-compare' type='hidden' value='0'/>");
			}
			$("#order-detail-modal-body").append("<input id='order-detail-modal-body-idOrder' type='hidden' value='"+order.id_order+"'/>");
			if(order.id_order_status != ORDER_STATUS_ORDERED){
				$("#modal-dialog-cancel").addClass('display-none');
				$("#modal-dialog-ok").addClass('display-none');
			}
			
			//add order user info
			$("#order-detail-modal-body").append('<div><b>Người đặt hàng:</b> '+orderUser[0]+'</div>');
			$("#order-detail-modal-body").append('<div><b>Điện thoại:</b> '+(StringUtil.isEmpty(orderUser[1])?'-':orderUser[1])+'</div>');
			$("#order-detail-modal-body").append('<div class="color-red-x bold-x">CHÚ Ý</div>');
			$("#order-detail-modal-body").append('<div class="color-red-x">Yêu cầu chuyển hàng đi thực tế phải đúng loại sản phẩm(hàng giá cũ, hàng giá mới) đang hiển thị trên DMS</div>');
			$("#order-detail-modal-body").append('<div class="color-red-x">Nếu làm khác đi, sai lệch dữ liệu, nhà phân phối sẽ tự chịu trách nhiệm.</div>');

			//add table
			var tableStr = 
			'<table class="uk-table uk-table-small uk-table-divider uk-table-striped uk-table-hover">'+
		        '<thead>'+
		            '<tr>'+
	                		'<th><span class="uk-margin-small-right" uk-icon="icon: list"></span>MÃ&nbsp;SẢN&nbsp;PHẨM</th>'+
		                '<th><span class="uk-margin-small-right" uk-icon="icon: comment"></span>TÊN&nbsp;SẢN&nbsp;PHẨM</th>'+
		                '<th><span class="uk-margin-small-right" uk-icon="icon: comment"></span>GIÁ</th>'+
		                '<th><span class="uk-margin-small-right" uk-icon="icon: comment"></span>SỐ&nbsp;LƯỢNG&nbsp;ĐẶT</th>'+
		                '<th><span class="uk-margin-small-right" uk-icon="icon: comment"></span>SỐ&nbsp;LƯỢNG&nbsp;KM</th>'+
		                '<th><span class="uk-margin-small-right" uk-icon="icon: comment"></span>SỐ&nbsp;LƯỢNG&nbsp;TỒN&nbsp;HIỆN&nbsp;TẠI</th>'+
		                '<th><span class="uk-margin-small-right" uk-icon="icon: comment"></span>GHI&nbsp;CHÚ</th>'+
		            '</tr>'+
		        '</thead>'+
		        '<tbody id="order-detail-modal-table-body">'+

		        '</tbody>'+
		    '</table>';
			$("#order-detail-modal-body").append(tableStr);
			
			if(order.id_order_status == 3){
				$("#order-detail-modal-body").append('<div class="text-align-right-x color-red-x bold-x" >Tổng thành tiền (tạm tính): <span id="money-result-total">'+/*formatCurrency(sumAll)*/0+' </span></div>');
			} else {
				$("#order-detail-modal-body").append('<div class="text-align-right-x color-red-x bold-x" >Tổng thành tiền: <span id="money-result-total" class="money-result-total-pdf">'+/*formatCurrency(sumAll)*/0+' </span></div>');
			}
			//add table row
			var rowStr = StringUtil.EMPTY;
			var idInventoryItemPre = -1;
			var lastIndex = -1;
			var rowCount = 0;
			for(let j = 0; j < warehouse.length;j++){
				let inventoryItemName = inventoryNames[warehouse[j].id_inventory_item];
				let idInventoryItem = warehouse[j].id_inventory_item;
				if(inventoryItemName != undefined){
					var remainInventoryInWarehouse = warehouse[j].inventory_item_num;
					if(orderDetailMap[idInventoryItemPre] != undefined){
						if(idInventoryItemPre != -1 && idInventoryItemPre != idInventoryItem && orderDetailMap[idInventoryItemPre].inventory_item_num > 0){
							$("#inventoryOrderInRow"+(j-1)).html(parseInt($("#inventoryOrderInRow"+(j-1)).html())+orderDetailMap[idInventoryItemPre].inventory_item_num);
						
						}
					}
					if(orderPromotionDetailMap[idInventoryItemPre] != undefined){
						if(idInventoryItemPre != -1 && idInventoryItemPre != idInventoryItem && orderPromotionDetailMap[idInventoryItemPre].inventory_item_num > 0){
							$("#inventoryPromotionOrderInRow"+(j-1)).html(parseInt($("#inventoryPromotionOrderInRow"+(j-1)).html())+orderPromotionDetailMap[idInventoryItemPre].inventory_item_num);
						
						}
					}
					idInventoryItemPre = idInventoryItem;
					//calculate inventory order with warehouse
					let inventoryOrderInRow = 0;
					//order greater than inventory in warehouse
					if(orderDetailMap[idInventoryItem] != undefined){
						if(orderDetailMap[idInventoryItem].inventory_item_num >= warehouse[j].inventory_item_num 
								&& warehouse[j].inventory_item_num != -1)
						{
							inventoryOrderInRow = warehouse[j].inventory_item_num;
							orderDetailMap[idInventoryItem].inventory_item_num = orderDetailMap[idInventoryItem].inventory_item_num - inventoryOrderInRow;
							if(warehouse[j].inventory_item_num != -1){
								warehouse[j].inventory_item_num = warehouse[j].inventory_item_num - inventoryOrderInRow;
							}
						}else{
							inventoryOrderInRow = orderDetailMap[idInventoryItem].inventory_item_num;
							orderDetailMap[idInventoryItem].inventory_item_num = orderDetailMap[idInventoryItem].inventory_item_num - inventoryOrderInRow;
							if(warehouse[j].inventory_item_num != -1){
								warehouse[j].inventory_item_num = warehouse[j].inventory_item_num - inventoryOrderInRow;
							}
						}
					}
					
					//calculate promotion inventory order with warehouse
					let inventoryPromotionOrderInRow = 0;
					if(orderPromotionDetailMap[idInventoryItem] != undefined){
						if(orderPromotionDetailMap[idInventoryItem].inventory_item_num >= warehouse[j].inventory_item_num 
								&& warehouse[j].inventory_item_num != -1)
						{
							inventoryPromotionOrderInRow = warehouse[j].inventory_item_num;
							orderPromotionDetailMap[idInventoryItem].inventory_item_num = orderPromotionDetailMap[idInventoryItem].inventory_item_num - inventoryPromotionOrderInRow;
							if(warehouse[j].inventory_item_num != -1){
								warehouse[j].inventory_item_num = warehouse[j].inventory_item_num - inventoryPromotionOrderInRow;
							}
						}else{
							inventoryPromotionOrderInRow = orderPromotionDetailMap[idInventoryItem].inventory_item_num;
							orderPromotionDetailMap[idInventoryItem].inventory_item_num = orderPromotionDetailMap[idInventoryItem].inventory_item_num - inventoryPromotionOrderInRow;
							if(warehouse[j].inventory_item_num != -1){
								warehouse[j].inventory_item_num = warehouse[j].inventory_item_num - inventoryPromotionOrderInRow;
							}
						}
					}

					rowStr = 
					'<tr>'+
						'<input type="hidden" id="idOrder'+rowCount+'" value="'+order.id_order+'"/>'+
						'<input type="hidden" id="idInventoryItem'+rowCount+'" value="'+idInventoryItem+'"/>'+
						'<input type="hidden" id="ordinal'+rowCount+'" value="'+warehouse[j].ordinal+'"/>'+
						'<input type="hidden" id="idPriceHistory'+rowCount+'" value="'+warehouse[j].id_price_history+'"/>'+
						'<input type="hidden" id="idPrice'+rowCount+'" value="'+warehouse[j].id_price+'"/>'+
						'<input type="hidden" id="inventoryItemNum'+rowCount+'" value="'+inventoryOrderInRow+'"/>'+
						'<input type="hidden" id="promotionInventoryItemNum'+rowCount+'" value="'+inventoryPromotionOrderInRow+'"/>'+
						'<input type="hidden" id="price'+rowCount+'" value="'+warehouse[j].price+'"/>'+
						'<input type="hidden" id="unit'+rowCount+'" value="'+warehouse[j].unit+'"/>'+
						'<td>'+warehouse[j].code_inventory_item+'</td>'+
						'<td>'+inventoryItemName+(warehouse[j].is_newest?'':' <br/>(Hàng giá cũ)')+'</td>'+
						'<td>'+formatCurrency(warehouse[j].price)+' '+warehouse[j].unit+'</td>'+
						'<td id="inventoryOrderInRow'+j+'">'+inventoryOrderInRow+'</td>'+
						'<td id="inventoryPromotionOrderInRow'+j+'">'+inventoryPromotionOrderInRow+'</td>'+
						'<td>'+(remainInventoryInWarehouse == -1?CHAR_INFINITY:remainInventoryInWarehouse)+'</td>'+
						'<td>BLOCK '+warehouse[j].ordinal+'</td>'+
					'</tr>';
					$("#order-detail-modal-table-body").append(rowStr);
					rowCount++;
					lastIndex = j;
				}
				
			}
			
			//check last inventory
			if(orderDetailMap[idInventoryItemPre] != undefined){
				if(orderDetailMap[idInventoryItemPre].inventory_item_num > 0){
					$("#inventoryOrderInRow"+(lastIndex)).html(parseInt($("#inventoryOrderInRow"+(lastIndex)).html())+orderDetailMap[idInventoryItemPre].inventory_item_num);
				
				}
			}
			if(orderPromotionDetailMap[idInventoryItemPre] != undefined){
				if(orderPromotionDetailMap[idInventoryItemPre].inventory_item_num > 0){
					$("#inventoryPromotionOrderInRow"+(lastIndex)).html(parseInt($("#inventoryPromotionOrderInRow"+(lastIndex)).html())+orderPromotionDetailMap[idInventoryItemPre].inventory_item_num);
				
				}
			}
			//add field set
			var fieldSet = '<form>'+
			    '<fieldset id="field-set" class="uk-fieldset">'+

			    '</fieldset>'+
			'</form>';
			$("#order-detail-modal-body").append(fieldSet);
			//add promotion check box
			var promotionCheckboxes = 
			'<div id="promotion-check" class="uk-margin">'+
	        '</div>';
			$("#field-set").append(promotionCheckboxes);
			if(orderPromotion != null){
				for(let i = 0; i < orderPromotion.length; i++){
					
					if(orderPromotion[i].reward == null && orderPromotion[i].unit == null){
						$("#promotion-check").append('<div><label><input disabled="true" class="uk-checkbox margin-bottom-5" type="checkbox" checked> '+orderPromotion[i].name_promotion_config + '</label></div>');
					} else {
						$("#promotion-check").append('<div><label><input disabled="true" class="uk-checkbox margin-bottom-5" type="checkbox" checked> '+orderPromotion[i].name_promotion_config+': <span class="color-red-x">' + formatCurrency(orderPromotion[i].reward) + ' ' + orderPromotion[i].unit + '</span></label></div>');
					}
				}
			}

			
			//add comments area
			var commentArea = 
		        '<div class="uk-margin">'+
		            '<input class="uk-input" type="text" id="order-detail-modal-body-area" placeholder="Lý do huỷ/ chấp nhận đơn hàng"/>'+
		        '</div>';
			$("#field-set").append(commentArea);
			
			$("#order-detail-modal-body-area").val(order.reject_comment);
			
			//caculate "thanh tien"
			var inventoryItemDetailLen = $("#order-detail-modal-table-body").children().length;
			var sum = 0;
			for(let i = 0; i < inventoryItemDetailLen; i++){
				sum += $("#inventoryItemNum" + i).val() * $("#price" + i).val();
			}
			
			$("#money-result-total").html(formatCurrency(sum));
			
			isShowOrderDetailModal = true;
			
		} else {
			processDataCommon(actionKey, actionValue, id);
		}
	}
}

function compareOrderWarehouseItem(orderLst, orderPromotionLst, warehouse){
	// calculate sum of inventory
	var sumOrderPromotionItem = {};
	for(let i = 0; i < orderLst.length; i++){
		if(sumOrderPromotionItem[orderLst[i].id_inventory_item] == undefined){
			sumOrderPromotionItem[orderLst[i].id_inventory_item] = orderLst[i].inventory_item_num;
		} else {
			sumOrderPromotionItem[orderLst[i].id_inventory_item] = sumOrderPromotionItem[orderLst[i].id_inventory_item] + orderLst[i].inventory_item_num;
		}
	}
	for(let i = 0; i < orderPromotionLst.length; i++){
		if(sumOrderPromotionItem[orderPromotionLst[i].id_inventory_item] == undefined){
			sumOrderPromotionItem[orderPromotionLst[i].id_inventory_item] = orderPromotionLst[i].inventory_item_num;
		} else {
			sumOrderPromotionItem[orderPromotionLst[i].id_inventory_item] = sumOrderPromotionItem[orderPromotionLst[i].id_inventory_item] + orderPromotionLst[i].inventory_item_num;
		}
	}
	
	var sumWarehouseItem = {};
	for(let i = 0; i < warehouse.length; i++){
		if(sumWarehouseItem[warehouse[i].id_inventory_item] == undefined){
			sumWarehouseItem[warehouse[i].id_inventory_item] = warehouse[i].inventory_item_num;
		} else {
			if(warehouse[i].inventory_item_num == -1) sumWarehouseItem[warehouse[i].id_inventory_item] = -1;
			else{
				if(sumWarehouseItem[warehouse[i].id_inventory_item] != -1){
					sumWarehouseItem[warehouse[i].id_inventory_item] = sumWarehouseItem[warehouse[i].id_inventory_item] + warehouse[i].inventory_item_num;
				}
			}
		}
	}
	
	for(let i = 0; i < warehouse.length; i++){
		if(sumOrderPromotionItem[warehouse[i].id_inventory_item] != undefined){
			if(sumOrderPromotionItem[warehouse[i].id_inventory_item] > sumWarehouseItem[warehouse[i].id_inventory_item]
				&& sumWarehouseItem[warehouse[i].id_inventory_item] != -1) return 1;
		}
	}
	
	return -1;
}

function cancelOrder(){
	var idOrder = $("#order-detail-modal-body-idOrder").val();
	var reason = $("#order-detail-modal-body-area").val();
	var data = {};
	data.idOrder = idOrder;
	data.reason = reason;
	if(StringUtil.isEmpty(reason)){
		notify('"Lý do" trống!', DANGER);
	} else {
		$.ajax({
			url: WEB_V1_REJECT_ORDER,
			method : POST,
			data : $.param(data),
			success: result => {
				
				UIkit.modal("#order-detail-modal").hide();
				processData(result);
			},
			error: error => {
				notify('Hệ thống lỗi, vui lòng thử lại sau...', DANGER);
			}
		});
	}
	
}

function acceptOrder() {
	
	UIkit.modal("#order-detail-modal").hide();

	var yesNoModal = createYesNoModal('', 'Bạn chắc chắn chấp nhận đơn hàng?', () => {
		
		var compareInventory = $("#order-detail-modal-body-compare").val();
		if(compareInventory == 1) {
			notify('Hàng trong kho không đủ!', DANGER);
		} else {
			var dataStr = "orderArrangement=";
			var trs = $("#order-detail-modal-table-body").contents();
			for(let i = 0; i < trs.length; i++){
				var data = {};
				data.id_order = $("#idOrder"+i).val();
				data.id_inventory_item = $("#idInventoryItem"+i).val();
				data.ordinal = $("#ordinal"+i).val();
				data.id_price_history = $("#idPriceHistory"+i).val();
				data.id_price = $("#idPrice"+i).val();
				data.inventory_item_num = $("#inventoryItemNum"+i).val();
				data.promotion_inventory_item_num = $("#promotionInventoryItemNum"+i).val();
				data.price = $("#price"+i).val();
				data.unit = $("#unit"+i).val();


				dataStr = dataStr + "&";

				dataStr = dataStr + "orderArrangement="+JSON.stringify(data);

			}
			dataStr = dataStr + "&";
			dataStr = dataStr + "whv=" + $("#whv").val();
			
			
			$.ajax({
				url: WEB_V1_ACCEPT_ORDER,
				method : POST,
				data : dataStr,
				success: result => {
					processData(result);
					//UIkit.modal("#order-detail-modal").hide();
				},
				error: error => {
					notify('Hệ thống lỗi, vui lòng thử lại sau...', DANGER);
				}
			});
			
		}
		
	});
	
	yesNoModal.show();

}

/////////////////////////////////////// s01102_order_accepted_cancel.html //////////////////////////////////
function acceptedCancelOrderShowDetail(idOrder) {

	
	$.ajax({
		url: WEB_V1_GET_ACCEPTED_CANCEL_ORDER_DETAIL,
		method : POST,
		data : "idOrder="+idOrder,
		success: result => {
			
			processDataOrderAcceptedCancel(result);
			UIkit.modal("#waiting-modal").hide();
			UIkit.modal("#order-detail-modal").show();
		},
		error: error => {
			UIkit.modal("#waiting-modal").hide();
			notify('Hệ thống lỗi, vui lòng thử lại sau...', DANGER);
		}
	});
}

function processDataOrderAcceptedCancel(result){
	var dataLst = result.data;
	var q = 0;
	for(q = 0;q < dataLst.length;q++){
		var data = dataLst[q];
		var actionKey = data.actionKey;
		var actionValue = data.actionValue;
		var id = data.idElement;

		if(actionKey == 'dataLst'){
			//get data
			var order = actionValue[0];
			var acceptedCancelLst = actionValue[1];
			var orderHavePromotionLst = actionValue[2];
			var orderUser = actionValue[3];
			var orderTarget = actionValue[4];
			var orderReceived = actionValue[5];
			var codeCustomerGroupOrderTarget = actionValue[6];
			var mst = actionValue[7];

			//set code order
			$("#order-detail-modal-head").html(order.code_order);
			//empty previous data
			$("#order-detail-modal-body").empty();
			//add order user
			$("#order-detail-modal-body").append('<div><b>Mã NV:</b> '+orderUser[2]+'</div>');
			$("#order-detail-modal-body").append('<div><b>Người đặt hàng:</b> '+orderUser[0]+'</div>');
			$("#order-detail-modal-body").append('<div><b>Điện thoại:</b> '+(StringUtil.isEmpty(orderUser[1])?'-':orderUser[1])+'</div>');
			
			$("#order-detail-modal-body").append('<div><input id="order-detail-order-target" type="hidden" value="'+orderTarget+'"/></div>');
			$("#order-detail-modal-body").append('<div><input id="order-detail-order-received" type="hidden" value="'+orderReceived+'"/></div>');
			$("#order-detail-modal-body").append('<div><input id="order-detail-order-received-mst" type="hidden" value="'+mst+'"/></div>');
			

			//add table
			var tableStr = 
			'<table id="table-pdf" class="uk-table uk-table-small uk-table-divider uk-table-striped uk-table-hover">'+
		        '<thead>'+
		            '<tr>'+
		            		'<th><span class="r-ico uk-margin-small-right" uk-icon="icon: list"></span><span class="msp">MÃ&nbsp;SẢN&nbsp;PHẨM</span></th>'+
		                '<th><span class="r-ico uk-margin-small-right" uk-icon="icon: comment"></span><span class="tsp">TÊN&nbsp;SẢN&nbsp;PHẨM</span></th>'+
		                '<th><span class="r-ico uk-margin-small-right" uk-icon="icon: comment"></span>GIÁ</th>'+
		                '<th><span class="r-ico uk-margin-small-right" uk-icon="icon: comment"></span><span class="sld">SỐ&nbsp;LƯỢNG&nbsp;ĐẶT</span></th>'+
		                '<th><span class="r-ico uk-margin-small-right " uk-icon="icon: comment"></span><span class="slkm">SỐ&nbsp;LƯỢNG&nbsp;KHUYẾN&nbsp;MÃI</span></th>'+
		                '<th class="tblock"><span class="r-ico uk-margin-small-right" uk-icon="icon: comment"></span>GHI&nbsp;CHÚ</th>'+
		            '</tr>'+
		        '</thead>'+
		        '<tbody id="order-detail-modal-table-body">'+

		        '</tbody>'+
		    '</table>';
			$("#order-detail-modal-body").append(tableStr);
			if(order.id_order_status == 3){
				$("#order-detail-modal-body").append('<div id="order-detail-money-total" class="text-align-right-x color-red-x bold-x" >Tổng thành tiền (tạm tính): <span id="money-result-total">'+0+'</span> </div>');
			} else {
				$("#order-detail-modal-body, #footer-pdf").append('<div id="order-detail-money-total" class="text-align-right-x color-red-x bold-x" >Tổng thành tiền: <span id="money-result-total">'+0+'</span> </div>');
			}
			//add table row
			var rowStr = StringUtil.EMPTY;
			
			for(let i = 0; i < acceptedCancelLst.length;i++){
				rowStr = 
					'<tr>'+
						'<td>'+acceptedCancelLst[i].code_inventory_item+'</td>'+
						'<td>'+acceptedCancelLst[i].name_inventory_item+(acceptedCancelLst[i].is_newest == 1?'':' (Hàng giá cũ)')+'</td>'+
						'<td>'+formatCurrency(acceptedCancelLst[i].price)+'</td>'+
						'<td>'+acceptedCancelLst[i].inventory_item_num+'</td>'+
						'<td>'+acceptedCancelLst[i].promotion_inventory_item_num+'</td>'+
						'<td class="tblock">BLOCK '+acceptedCancelLst[i].ordinal+'</td>'+
					'</tr>';
					$("#order-detail-modal-table-body").append(rowStr);
			}
			
			
			//add field set
			var fieldSet = '<form id="order-detail-money-promotion">'+
			    '<fieldset id="field-set" class="uk-fieldset">'+

			    '</fieldset>'+
			'</form>';
			$("#order-detail-modal-body, #footer-pdf").append(fieldSet);
			//add promotion check box
			var promotionCheckboxes = 
			'<div id="promotion-check" class="uk-margin promotion-check-pdf">'+
	        '</div>';
			$("#field-set").append(promotionCheckboxes);
			if(orderHavePromotionLst != null){
				for(let i = 0; i < orderHavePromotionLst.length; i++){
					if(orderHavePromotionLst[i].reward == null && orderHavePromotionLst[i].unit == null){
						$("#promotion-check, .promotion-check-pdf").append('<div><label><input disabled="true" class="uk-checkbox margin-bottom-5" type="checkbox" checked> '+orderHavePromotionLst[i].name_promotion_config + '</label></div>');
					} else {
						$("#promotion-check, .promotion-check-pdf").append('<div><label><input disabled="true" class="uk-checkbox margin-bottom-5" type="checkbox" checked> '+orderHavePromotionLst[i].name_promotion_config+': <span class="color-red-x">' + formatCurrency(orderHavePromotionLst[i].reward) + ' ' + orderHavePromotionLst[i].unit + '</span></label></div>');
					}
				}
			}

			
			//add comments area
			var commentArea = 
		        '<div class="uk-margin">'+
		            '<input class="uk-input" type="text" id="order-detail-modal-body-area" placeholder="Lý do huỷ/ chấp nhận đơn hàng"/>'+
		        '</div>';
			$("#field-set").append(commentArea);
			
			$("#order-detail-modal-body-area").val(order.reject_comment);
			
			//caculate "thanh tien"
			var inventoryItemDetailLen = $("#order-detail-modal-table-body").children().length;
			var sum = 0;
			for(let i = 0; i < inventoryItemDetailLen; i++){
				sum += acceptedCancelLst[i].inventory_item_num * acceptedCancelLst[i].price;
			}
			
			$("#money-result-total, .money-result-total-pdf").html(formatCurrency(sum));
			$("#money-result-total").append('<input id ="money-result-total-real" type="hidden" value="'+sum+'"> ');
			
			$('#order-detail-modal-order-received-btn').removeClass('display-none');
			if(codeCustomerGroupOrderTarget == 0){
				$('#order-detail-modal-order-received-btn').addClass('display-none');
			}
			
			$('#order-detail-modal-order-received-btn').attr('idorder', order.id_order);
			$('#order-detail-modal-order-received-btn').on('click', function (){
				var orderDetailModalFinishOrderBtn = this;
				
				var idOrder = $('#'+orderDetailModalFinishOrderBtn.id).attr('idorder');
				
				
				UIkit.modal("#order-detail-modal").hide();

				var yesNoModal = createYesNoModal('', 'Bạn chắc chắn muốn hoàn thành đơn hàng?', () => {
						
					$.ajax({
						url: WEB_V1_ORDER_RECEIVED2,
						method : POST,
						data : 'idOrder=' + idOrder,
						success: result => {
							processData(result);
							//UIkit.modal("#order-detail-modal").hide();
						},
						error: error => {
							notify('Hệ thống lỗi, vui lòng thử lại sau...', DANGER);
						}
					});

				});
				
				yesNoModal.show();
				
				
			});
			
		} else {
			processDataCommon(actionKey, actionValue, id);
		}
	}
}


/////////////////////////////////////// s01201_create_return_order.html //////////////////////////////////
function getOrdered(){

	$("#create-return-form-ordered").empty();
	$("#create-return-form-show-detail-btn").empty();
	$("#create-return-form-show-detail").empty();
	$("#create-return-form-reorder").empty();
	
	
	var idCustomerS = $("#return-order-customer-sel").val();
	if(idCustomerS == -1) {
		return;
	}
	
	UIkit.modal("#waiting-modal").show();
	
	$.ajax({
		url: WEB_V1_GET_ORDERED,
		method : POST,
		data : "idCustomerS="+idCustomerS,
		success: result => {
			
			processDataOrdered(result);
			setInterval(function(){UIkit.modal("#waiting-modal").hide();}, 1000);
		},
		error: error => {
			setInterval(function(){UIkit.modal("#waiting-modal").hide();
				notify('Hệ thống lỗi, vui lòng thử lại sau...', DANGER);
			}, 1000);
			
		}
	});
}

function processDataOrdered(result){
	var dataLst = result.data;
	var q = 0;
	for(q = 0;q < dataLst.length;q++){
		var data = dataLst[q];
		var actionKey = data.actionKey;
		var actionValue = data.actionValue;
		var id = data.idElement;

		if(actionKey == 'resOrderWebLst'){

			let i = 0;
			actionValue.forEach(resOrderWeb => {
				$("#create-return-form-ordered").append('<label class="uk-form-label"><input value="'+resOrderWeb.id_order+'" class="uk-checkbox" type="checkbox" id="order'+i+'"/> '+resOrderWeb.code_order+'</label>');
				i++;
			});
			
			$("#create-return-form-ordered").append('<input id="create-return-form-ordered-num" type="hidden" value="'+actionValue.length+'"/>');
			
			if(actionValue.length > 0){
				$("#create-return-form-show-detail-btn").append('<button class="uk-button uk-button-primary" uk-toggle="target: #waiting-modal" onclick="showOrderedDetail();">Hiển thị</button>');
			}
			
		} else {
			processDataCommon(actionKey, actionValue, id);
		}
	}
}

function showOrderedDetail(){
	$("#create-return-form-show-detail").empty();
	$("#create-return-form-reorder").empty();
	let idCustomerS = $("#return-order-customer-sel").val();
	let orderedNum = parseInt($("#create-return-form-ordered-num").val());
	let data = 'idCustomerS='+idCustomerS+'&idOrder=';
	let orderChecked = false;
	for(let i = 0; i < orderedNum; i++){
		if($("#order" + i)[0].checked){
			data = data + '&idOrder=' + $("#order" + i).val();
			orderChecked = true;
		}
	}
	
	if(!orderChecked) {
		notify('Đơn hàng chưa được chọn...', DANGER);
		return;
	}
	

	$.ajax({
		url: WEB_V1_GET_ORDERED_DETAIL,
		method : POST,
		data : data,
		success: result => {
			
			processDataOrderedDetail(result);
			UIkit.modal("#waiting-modal").hide();
		},
		error: error => {
			UIkit.modal("#waiting-modal").hide();
			notify('Hệ thống lỗi, vui lòng thử lại sau...', DANGER);
			
			
		}
	});
}

function processDataOrderedDetail(result){
	var dataLst = result.data;
	var q = 0;
	for(q = 0;q < dataLst.length;q++){
		var data = dataLst[q];
		var actionKey = data.actionKey;
		var actionValue = data.actionValue;
		var id = data.idElement;

		if(actionKey == 'resOrderDetailWeblst'){
			
			if(actionValue.length > 0){
				$("#create-return-form-show-detail").append(
						'<div class="uk-overflow-auto">'+
						    '<table class="uk-table uk-table-small uk-table-divider uk-table-striped uk-table-hover">'+
						        '<thead>'+
						            '<tr>'+
						                '<th><span class="uk-margin-small-right" uk-icon="icon: list"></span>TÊN&nbsp;SẢN&nbsp;PHẨM</th>'+
						                '<th><span class="uk-margin-small-right" uk-icon="icon: comment"></span>SL&nbsp;ĐẶT</th>'+
						                '<th><span class="uk-margin-small-right" uk-icon="icon: comment"></span>SL&nbsp;KHUYẾN MÃI</th>'+
						            '</tr>'+
						        '</thead>'+
						        '<tbody id="ordered-detail-body">'+
						        	
						        '</tbody>'+
						    '</table>'+
						'</div>'
						);
				
				let i = 0;
				actionValue.forEach(resOrderDetailWeb => {
					let dataStr = 
					'<tr id="itemrow_'+i+'" idinventoryitem="'+resOrderDetailWeb.id_inventory_item+'">'+
						'<td>'+resOrderDetailWeb.name_inventory_item+'</td>'+
						'<td id="inventory_item_'+resOrderDetailWeb.id_inventory_item+'_0">'+resOrderDetailWeb.inventory_item_num+'</td>'+
						'<td id="inventory_item_'+resOrderDetailWeb.id_inventory_item+'_1">'+resOrderDetailWeb.promotion_inventory_item_num+'</td>'+
					'</tr>';
					$("#ordered-detail-body").append(dataStr);
					i++;
				});
				
				$("#ordered-detail-body").append('<input id="create-return-form-ordered-detail-num" type="hidden" value="'+actionValue.length+'"/>');
			
				$("#create-return-form-show-detail").append('<div class="uk-margin uk-grid-small uk-child-width-auto uk-grid">'+
													            '<label><input class="uk-radio" type="radio" id="return-whole-rdo" onchange="reorderPerform();" name="return-rdo"> Trả toàn bộ đơn hàng</label>'+
													            '<label class="display-none"><input class="uk-radio" type="radio" id="return-apart-rdo" onchange="reorderPerform();" name="return-rdo"> Trả một phần đơn hàng<span style="color:#FF0000;"> (Điền thông tin khách hàng KHÔNG trả vào phía dưới)</span></label>'+
													        '</div>');
			}
			

		} else if(actionKey == 'resInventoryItemLst'){
			if(actionValue.length > 0){
				$("#create-return-form-reorder").append(
						'<div id="reordered-detail" class="uk-overflow-auto display-none">'+
						    '<table class="uk-table uk-table-small uk-table-divider uk-table-striped uk-table-hover">'+
						        '<thead>'+
						            '<tr>'+
						                '<th><span class="uk-margin-small-right" uk-icon="icon: list"></span>TÊN&nbsp;SẢN&nbsp;PHẨM</th>'+
						                '<th><span class="uk-margin-small-right" uk-icon="icon: comment"></span>SL&nbsp;ĐẶT</th>'+
						                '<th><span class="uk-margin-small-right" uk-icon="icon: comment"></span>SL&nbsp;KHUYẾN MÃI</th>'+
						            '</tr>'+
						        '</thead>'+
						        '<tbody id="reordered-detail-body">'+
						        	
						        '</tbody>'+
						    '</table>'+
						'</div>'
						);
				
				let i = 0;
				actionValue.forEach(resInventoryItem => {
					let dataStr = 
					'<tr id="itemrowx_'+i+'" reorderidinventoryitem="'+resInventoryItem.id_inventory_item+'">'+
						'<td>'+resInventoryItem.name_inventory_item+'</td>'+
						'<td><input id="reorder_inventory_item_'+resInventoryItem.id_inventory_item+'_0" class="uk-input" type="number" min="0" placeholder="SL đặt" disabled></td>'+
						'<td><input id="reorder_inventory_item_'+resInventoryItem.id_inventory_item+'_1" class="uk-input" type="number" min="0" placeholder="SL khuyến mãi" disabled></td>'+
					'</tr>';
					$("#reordered-detail-body").append(dataStr);
					i++;
				});
				
				$("#reordered-detail-body").append('<input id="create-return-form-reorder-num" type="hidden" value="'+actionValue.length+'"/>');
				
				$("#create-return-form-reorder").append(
						'<div>'+
							'<button class="uk-button uk-button-primary" onclick="createReturnOrderAndReOrder();">Xác nhận</button>'+
						'</div>');
			}
		} else {
			processDataCommon(actionKey, actionValue, id);
		}
	}
}

function reorderPerform(){
	var createReturnFormReorderNum = $("#create-return-form-reorder-num").val();
	
	if($("#return-whole-rdo")[0].checked){

		$("#reordered-detail").addClass('display-none');
		$("#create-return-form-reorder-title").html('');
		
		for(let i = 1; i <= createReturnFormReorderNum; i++){
			$("#reorder_inventory_item_"+i+"_0").prop('disabled', true);
			$("#reorder_inventory_item_"+i+"_1").prop('disabled', true);
		}
	} else if($("#return-apart-rdo")[0].checked){
		$("#reordered-detail").removeClass('display-none');
		$("#create-return-form-reorder-title").html('Đặt hàng lại');
		for(let i = 1; i <= createReturnFormReorderNum; i++){
			$("#reorder_inventory_item_"+i+"_0").prop('disabled', false);
			$("#reorder_inventory_item_"+i+"_1").prop('disabled', false);
		}
	} else {
		notify('Bạn chưa chọn cách trả hàng!', 'danger');
	}
}

function createReturnOrderAndReOrder(){
	
	if($("#return-whole-rdo")[0].checked == false && $("#return-apart-rdo")[0].checked == false){
		//notify('Bạn phải chọn "trả toàn bộ" hoặc "trả một phần" đơn hàng!', 'danger');
		notify('Bạn phải chọn "trả toàn bộ"!', 'danger');
		return;
	}

	var yesNoModal = createYesNoModal('', 'Bạn chắc chắn muốn tạo đơn trả hàng?', () => {
		//validate
		var orderedDetailNum = $("#create-return-form-ordered-detail-num").val();
		if(StringUtil.isEmpty(orderedDetailNum)){
			notify('Có lỗi xảy ra!', 'danger');
			return;
		}
		
		//validate reorder not larger than order detail
		for(let i = 0; i < orderedDetailNum; i++){
			let idInventoryItem = $("#itemrow_" + i).attr('idinventoryitem');
			let orderedItemNum = parseInt($("#inventory_item_"+idInventoryItem+"_0").text());
			let value = $("#reorder_inventory_item_"+idInventoryItem+"_0").val();
			let reorderItemNum = StringUtil.isEmpty(value)? 0 : parseInt(value);
			if(reorderItemNum > orderedItemNum){
				notify('Số lượng đặt lại không thể lớn hơn số lượng đã đặt!', 'danger');
				return;
			}
		}
		
		var reorderedNum = $("#create-return-form-reorder-num").val();
		if(StringUtil.isEmpty(reorderedNum)){
			notify('Có lỗi xảy ra!', 'danger');
			return;
		}
		
		//if return apart inventory items then reorder must have
		if($("#return-apart-rdo")[0].checked){
			
			let isValid = false;
			
			for(let i = 0; i < reorderedNum; i++){
				let idInventoryItem = $("#itemrowx_" + i).attr('reorderidinventoryitem');
				let value0 = $("#reorder_inventory_item_"+idInventoryItem+"_0").val();
				let value1 = $("#reorder_inventory_item_"+idInventoryItem+"_1").val();
				
				if(StringUtil.isNotEmpty(value0) || StringUtil.isNotEmpty(value1)) isValid = true;
			}
			
			if(!isValid){
				notify('Dữ liệu sản phẩm trống!', 'danger');
				return;
			}
		}
		
		for(let i = 0; i < reorderedNum; i++){
			let idInventoryItem = $("#itemrowx_" + i).attr('reorderidinventoryitem');
			let value = $("#reorder_inventory_item_"+idInventoryItem+"_0").val();
			let reorderItemNum = StringUtil.isEmpty(value)? 0 : parseInt(value);
			if(reorderItemNum > 0 && $("#inventory_item_"+idInventoryItem+"_0").length <= 0){
				notify('Sản phẩm đặt lại khác đã đặt!', 'danger');
				return;
			}
			
			
		}
		
		//logic

		

		var idCustomerS = parseInt($("#return-order-customer-sel").val());
		var idOrderArr = [];
		for(let i = 0; i < $("#create-return-form-ordered-num").val(); i++){
			if($("#order" + i)[0].checked){
				idOrderArr.push(parseInt($("#order" + i).val()));
			}
		}
		
		if(idOrderArr.length > 1){
			notify('Một lần trả chỉ trả một đơn!', 'danger');
			return;
		}
		
		UIkit.modal("#waiting-modal").show();
		
		var reorderIdInventoryArr = [];
		var reorderInventoryNumArr = [];
		var reorderPromotionInventoryNumArr = [];
		
		for(let i = 0; i < $("#create-return-form-reorder-num").val(); i++){
			let reorderIdInventoryItem = parseInt($("#itemrowx_" + i).attr('reorderidinventoryitem'));

			let value = $("#reorder_inventory_item_"+reorderIdInventoryItem+"_0").val();
			let reorderInventoryNum = StringUtil.isEmpty(value) ? 0 : parseInt(value);

			value = $("#reorder_inventory_item_"+reorderIdInventoryItem+"_1").val();
			let reorderPromotionInventoryNum = StringUtil.isEmpty(value) ? 0 : parseInt(value);

			if(reorderInventoryNum == 0 && reorderPromotionInventoryNum == 0) continue;
			reorderIdInventoryArr.push(reorderIdInventoryItem);
			reorderInventoryNumArr.push(reorderInventoryNum);
			reorderPromotionInventoryNumArr.push(reorderPromotionInventoryNum);
		}



		
		var data = 'idCustomerS=' + idCustomerS;
		data = data + '&idOrder=';
		idOrderArr.forEach(idOrder => {
			data = data + '&idOrder=' + idOrder;
		});
		
		data = data + '&reorderIdInventory=&reorderIdInventory=';
		reorderIdInventoryArr.forEach(reorderIdInventory => {
			data = data + '&reorderIdInventory=' + reorderIdInventory;
		});
		
		data = data + '&reorderInventoryNum=&reorderInventoryNum=';
		reorderInventoryNumArr.forEach(reorderInventoryNum => {
			data = data + '&reorderInventoryNum=' + reorderInventoryNum;
		});
		
		data = data + '&reorderPromotionInventoryNum=&reorderPromotionInventoryNum=';
		reorderPromotionInventoryNumArr.forEach(reorderPromotionInventoryNum => {
			data = data + '&reorderPromotionInventoryNum=' + reorderPromotionInventoryNum;
		});
		
		$.ajax({
			url: WEB_V1_CREATE_RETURN_ORDER_AND_REORDER,
			method : POST,
			data : data,
			success: result => {
				var s = JSON.stringify(result);
				processData(result);
				setInterval(function(){UIkit.modal("#waiting-modal").hide();}, 1000);
			},
			error: error => {
				setInterval(function(){UIkit.modal("#waiting-modal").hide();
					notify('Hệ thống lỗi, vui lòng thử lại sau...', DANGER);
				}, 1000);
				
			}
		});
	});

	yesNoModal.show();

}

function addInventoryItemCategory(){
	var misaCodeId = $("#misa-code-id").val();
	var codeInventoryCategory = $("#code-inventory-category").val();
	var nameInventoryCategory = $("#name-inventory-category").val();
	var description = $("#description").val();
	
	if(StringUtil.isEmpty(misaCodeId) || StringUtil.isEmpty(codeInventoryCategory) || StringUtil.isEmpty(nameInventoryCategory)){

		notify('Vài trường bị trống...', DANGER);

		return;
	}
	
	UIkit.modal("#waiting-modal").show();
	
	var data = 'misaCodeId=' + misaCodeId;
	data = data + '&codeInventoryCategory=' + codeInventoryCategory;
	data = data + '&nameInventoryCategory=' + nameInventoryCategory;
	data = data + '&description=' + description;
	
	$.ajax({
		url: WEB_V1_ADD_INVENTORY_ITEM_CATEGORY,
		method : POST,
		data : data,
		success: result => {
			var s = JSON.stringify(result);
			processData(result);
			setInterval(function(){UIkit.modal("#waiting-modal").hide();}, 1000);
		},
		error: error => {
			setInterval(function(){UIkit.modal("#waiting-modal").hide();
				notify('Hệ thống lỗi, vui lòng thử lại sau...', DANGER);
			}, 1000);
			
		}
	});
}

function deleteInventoryItemCategory(idInventoryItemCategory){
	if(StringUtil.isEmpty(idInventoryItemCategory)){
		notify('Có lỗi xảy ra...', DANGER);
		return;
	}
	
	UIkit.modal("#waiting-modal").show();
	
	var data='idInventoryItemCategory='+idInventoryItemCategory;

	$.ajax({
		url: WEB_V1_DELETE_INVENTORY_ITEM_CATEGORY,
		method : POST,
		data : data,
		success: result => {
			var s = JSON.stringify(result);
			processData(result);
			setInterval(function(){UIkit.modal("#waiting-modal").hide();}, 1000);
		},
		error: error => {
			setInterval(function(){UIkit.modal("#waiting-modal").hide();
				notify('Hệ thống lỗi, vui lòng thử lại sau...', DANGER);
			}, 1000);
			
		}
	});
}

function addUnit(){
	var nameUnit = $("#name-unit").val();
	var description = $("#description").val();
	
	if(StringUtil.isEmpty(nameUnit)){

		notify('Vài trường bị trống...', DANGER);

		return;
	}
	
	UIkit.modal("#waiting-modal").show();
	
	var data = 'nameUnit=' + nameUnit;
	data = data + '&description=' + description;
	
	$.ajax({
		url: WEB_V1_ADD_UNIT,
		method : POST,
		data : data,
		success: result => {
			var s = JSON.stringify(result);
			processData(result);
			setInterval(function(){UIkit.modal("#waiting-modal").hide();}, 1000);
		},
		error: error => {
			setInterval(function(){UIkit.modal("#waiting-modal").hide();
				notify('Hệ thống lỗi, vui lòng thử lại sau...', DANGER);
			}, 1000);
			
		}
	});
}



function addInventoryItem(){
	var codeInventoryItem = $("#code-inventory-item").val();
	var nameInventoryItem = $("#name-inventory-item").val();
	var description = $("#description").val();
	var childItemNum = $("#child-item-num").val();
	var saleStatus = $("#sale-status").val();
	var idUnit = $("#id-unit").val();
	var codeInventoryCategory = $("#code-inventory-category").val();
	
	if(StringUtil.isEmpty(codeInventoryItem) || StringUtil.isEmpty(nameInventoryItem) || StringUtil.isEmpty(childItemNum)
			|| StringUtil.isEmpty(saleStatus) || StringUtil.isEmpty(idUnit) || StringUtil.isEmpty(codeInventoryCategory)){

		notify('Vài trường bị trống...', DANGER);

		return;
	}
	
	UIkit.modal("#waiting-modal").show();
	
	var data = 'codeInventoryItem=' + codeInventoryItem;
	data = data + '&nameInventoryItem=' + nameInventoryItem;
	data = data + '&description=' + description;
	data = data + '&childItemNum=' + childItemNum;
	data = data + '&saleStatus=' + saleStatus;
	data = data + '&idUnit=' + idUnit;
	data = data + '&codeInventoryCategory=' + codeInventoryCategory;
	
	$.ajax({
		url: WEB_V1_ADD_INVENTORY_ITEM,
		method : POST,
		data : data,
		success: result => {
			var s = JSON.stringify(result);
			processData(result);
			setInterval(function(){UIkit.modal("#waiting-modal").hide();}, 1000);
		},
		error: error => {
			setInterval(function(){UIkit.modal("#waiting-modal").hide();
				notify('Hệ thống lỗi, vui lòng thử lại sau...', DANGER);
			}, 1000);
			
		}
	});
}

function addPriceHistory(){
	var idInventoryItem = $("#id-inventory-item").val();

	if(StringUtil.isEmpty(idInventoryItem)){

		notify('Vài trường bị trống...', DANGER);

		return;
	}
	
	UIkit.modal("#waiting-modal").show();
	
	var data = 'idInventoryItem=' + idInventoryItem;
	
	$.ajax({
		url: WEB_V1_ADD_PRICE_HISTORY,
		method : POST,
		data : data,
		success: result => {
			var s = JSON.stringify(result);
			processData(result);
			setInterval(function(){UIkit.modal("#waiting-modal").hide();}, 1000);
		},
		error: error => {
			setInterval(function(){UIkit.modal("#waiting-modal").hide();
				notify('Hệ thống lỗi, vui lòng thử lại sau...', DANGER);
			}, 1000);
			
		}
	});
}

function addPrice(){
	var idPriceHistory = $("#id-price-history").val();
	var price0 = $("#price0").val();
	var priceDiv0 = $("#price-div0").val();
	var price1 = $("#price1").val();
	var priceDiv1 = $("#price-div1").val();
	var price2 = $("#price2").val();
	var priceDiv2 = $("#price-div2").val();
	var unit = $("#unit").val();
	var idInventoryItem = $("#id-inventory-item").val();

	if(StringUtil.isEmpty(idPriceHistory)
			|| StringUtil.isEmpty(price0)
			|| StringUtil.isEmpty(priceDiv0)
			|| StringUtil.isEmpty(price1)
			|| StringUtil.isEmpty(priceDiv1)
			|| StringUtil.isEmpty(price2)
			|| StringUtil.isEmpty(priceDiv2)
			|| StringUtil.isEmpty(unit)
			|| StringUtil.isEmpty(idInventoryItem)
			){

		notify('Vài trường bị trống...', DANGER);

		return;
	}
	
	UIkit.modal("#waiting-modal").show();
	
	var data = 'idPriceHistory=' + idPriceHistory;
	data = data + '&price0=' + price0;
	data = data + '&priceDiv0=' + priceDiv0;
	data = data + '&price1=' + price1;
	data = data + '&priceDiv1=' + priceDiv1;
	data = data + '&price2=' + price2;
	data = data + '&priceDiv2=' + priceDiv2;
	data = data + '&unit=' + unit;
	data = data + '&idInventoryItem=' + idInventoryItem;
	
	$.ajax({
		url: WEB_V1_ADD_PRICE,
		method : POST,
		data : data,
		success: result => {
			var s = JSON.stringify(result);
			processData(result);
			setInterval(function(){UIkit.modal("#waiting-modal").hide();}, 1000);
		},
		error: error => {
			setInterval(function(){UIkit.modal("#waiting-modal").hide();
				notify('Hệ thống lỗi, vui lòng thử lại sau...', DANGER);
			}, 1000);
			
		}
	});
}



function applyPriceForCustomer(){
	var idPriceHistory = $("#id-price-history").val();
	var inventoryItemNum = $("#inventory-item-num").val();
	
	if(StringUtil.isEmpty(inventoryItemNum)){
		inventoryItemNum = 0;
	}

	if(StringUtil.isEmpty(idPriceHistory)
			){

		notify('Vài trường bị trống...', DANGER);

		return;
	}
	
	UIkit.modal("#waiting-modal").show();
	
	var data = 'idPriceHistory=' + idPriceHistory;
	data = data + '&inventoryItemNum=' + inventoryItemNum;
	
	$.ajax({
		url: WEB_V1_ADD_PRICE_APPLY,
		method : POST,
		data : data,
		success: result => {
			var s = JSON.stringify(result);
			processData(result);
			setInterval(function(){UIkit.modal("#waiting-modal").hide();}, 1000);
		},
		error: error => {
			setInterval(function(){UIkit.modal("#waiting-modal").hide();
				notify('Hệ thống lỗi, vui lòng thử lại sau...', DANGER);
			}, 1000);
			
		}
	});
}

function orderWeb(){
	var inventoryNum = $('#inventory-num').val();
	
	var data = 'idInventoryItem=&num=';
	
	for(let i = 0; i < inventoryNum; i++){
		
		var inventory = $('#inventory' + i);
		var num = inventory.val();
		if(StringUtil.isEmpty(num)){
			num = 0;
		}
		var idInventoryItem = inventory.attr('idinventoryitem');
		
		data = data + '&idInventoryItem=' + idInventoryItem + '&num=' + num;
	}
	
	var orderTargetS = $('#order-target-s').val();
	data = data + '&orderTargetS=' + orderTargetS;
	
	if(orderTargetS == -1){
		notify('Cửa hàng chưa được chọn!', DANGER);
		setInterval(function(){UIkit.modal("#waiting-modal").hide();}, 1000);
		return;
	}
	
	$('#orderweb-order-btn').prop('disabled', true);
	
	setTimeout(function(){
		$('#orderweb-order-btn').prop('disabled', false);
	}, 5000);
	
	
	$.ajax({
		url: WEB_V1_ORDER,
		method : POST,
		data : data,
		success: result => {
			var s = JSON.stringify(result);
			processData(result);
			setInterval(function(){UIkit.modal("#waiting-modal").hide();}, 1000);
		},
		error: error => {
			setInterval(function(){UIkit.modal("#waiting-modal").hide();
				notify('Hệ thống lỗi, vui lòng thử lại sau...', DANGER);
			}, 1000);
			
		}
	});
}

function orderListShowOrderDetail(idOrder){
	$.ajax({
		url: WEB_V1_GET_ORDER_LIST_DETAIL,
		method : POST,
		data : "idOrder="+idOrder,
		success: result => {
			
			processDataOrderList(result);
			UIkit.modal("#waiting-modal").hide();
			UIkit.modal("#order-detail").show();
		},
		error: error => {
			UIkit.modal("#waiting-modal").hide();
			notify('Hệ thống lỗi, vui lòng thử lại sau...', DANGER);
		}
	});
}

function processDataOrderList(result){
	var dataLst = result.data;
	var q = 0;
	for(q = 0;q < dataLst.length;q++){
		var data = dataLst[q];
		var actionKey = data.actionKey;
		var actionValue = data.actionValue;
		var id = data.idElement;

		if(actionKey == 'dataLst'){
			//get data
			var idOrder = actionValue[0];
			var codeOrder = actionValue[1];
			var idOrderStatus = actionValue[2];
			var resOrderListDetailWebLst = actionValue[3];
			var sumAll = actionValue[4];
			
			$("#modal-head").html(codeOrder);
			$("#modal-body").empty();
			$("#modal-dialog-btn").empty();

			//add table
			var tableStr = 
			'<table class="uk-table uk-table-small uk-table-divider uk-table-striped uk-table-hover">'+
		        '<thead>'+
		            '<tr>'+
	                		'<th><span class="uk-margin-small-right" uk-icon="icon: list"></span>MÃ&nbsp;SẢN&nbsp;PHẨM</th>'+
		                '<th><span class="uk-margin-small-right" uk-icon="icon: comment"></span>TÊN&nbsp;SẢN&nbsp;PHẨM</th>'+
		                '<th><span class="uk-margin-small-right" uk-icon="icon: comment"></span>GIÁ</th>'+
		                '<th><span class="uk-margin-small-right" uk-icon="icon: comment"></span>SỐ&nbsp;LƯỢNG&nbsp;ĐẶT</th>'+
		                '<th><span class="uk-margin-small-right" uk-icon="icon: comment"></span>TỔNG</th>'+
		            '</tr>'+
		        '</thead>'+
		        '<tbody id="order-detail-modal-table-body">'+

		        '</tbody>'+
		    '</table>';
			$("#modal-body").append(tableStr);
			$("#modal-body").append('<input type="hidden" id="id-order" value="'+idOrder+'"/>');
			if(idOrderStatus == 1 || idOrderStatus == 3){
				$("#modal-body").append('<div class="text-align-right-x color-red-x bold-x" >Tổng thành tiền (tạm tính): '+formatCurrency(sumAll)+' </div>');
			} else {
				$("#modal-body").append('<div class="text-align-right-x color-red-x bold-x" >Tổng thành tiền: '+formatCurrency(sumAll)+' </div>');
			}
			
			
			//add table row
			resOrderListDetailWebLst.forEach((item, index) =>{
				
				var priceStr = item.price;
				var _price = priceStr.split('@')[0];
				var _unit = priceStr.split('@')[1];

				var rowStr = 
					'<tr>'+
						'<td>'+item.code_inventory_item+'</td>'+
						'<td>'+item.name_inventory_item+(item.is_newest == 1?'':' (Hàng giá cũ)')+'</td>'+
						'<td>'+formatCurrency(_price) + ' ' + _unit +'</td>'+
						'<td>'+item.inventory_item_num+'</td>'+
						'<td>'+formatCurrency(item.sum)+'</td>'+
					'</tr>';
				$("#order-detail-modal-table-body").append(rowStr);
				
			});
			
			if(idOrderStatus == 2){
				$("#modal-dialog-btn").append('<button id="modal-dialog-ok" class="uk-button uk-button-primary" type="button" onclick="confirmReceived();">CỬA HÀNG ĐÃ NHẬN HÀNG</button>');
				$("#modal-dialog-btn").append('<button class="uk-button uk-button-default uk-modal-close" type="button">Đóng lại</button>');
			} else {
				$("#modal-dialog-btn").append('<button class="uk-button uk-button-default uk-modal-close" type="button">Đóng lại</button>');
			}
					
				
			
		} else {
			processDataCommon(actionKey, actionValue, id);
		}
	}
}

function confirmReceived(){
	var idOrder = $('#id-order').val();
	
	$.ajax({
		url: WEB_V1_ORDER_RECEIVED,
		method : POST,
		data : "idOrder="+idOrder,
		success: result => {
			
			processData(result);

			UIkit.modal("#order-detail").hide();
		},
		error: error => {

			notify('Hệ thống lỗi, vui lòng thử lại sau...', DANGER);
		}
	});
}

function changepass(){

	
	$.ajax({
		url: '',
		method : POST,
		data : $("form").serialize(),
		success: result => {
			UIkit.modal("#waiting-modal").hide();
			processData(result);
		},
		error: error => {
			UIkit.modal("#waiting-modal").hide();
			notify('Hệ thống lỗi, vui lòng thử lại sau...', DANGER);
		}
	});
}

function showWarehouse(){
	var idCustomerS = $('#id-customer-s').val();
	
	if(idCustomerS == -1){
		
		$("#warehouse-detail").empty();
		$("#warehouse-title").html('');
		
		notify('Cửa hàng chưa được chọn!', DANGER);

		setInterval(function(){UIkit.modal("#waiting-modal").hide();}, 1000);
		return;
	}
	
	var data = 'idCustomerS=' + idCustomerS;
	
	$.ajax({
		url: WEB_V1_GET_WAREHOUSE_DETAIL,
		method : POST,
		data : data,
		success: result => {
			var s = JSON.stringify(result);
			processDataShowWarehouse(result);
			setInterval(function(){UIkit.modal("#waiting-modal").hide();}, 1000);
		},
		error: error => {
			setInterval(function(){UIkit.modal("#waiting-modal").hide();
				notify('Hệ thống lỗi, vui lòng thử lại sau...', DANGER);
			}, 1000);
			
		}
	});
}

function processDataShowWarehouse(result){
	var dataLst = result.data;
	var q = 0;
	for(q = 0;q < dataLst.length;q++){
		var data = dataLst[q];
		var actionKey = data.actionKey;
		var actionValue = data.actionValue;
		var id = data.idElement;

		if(actionKey == 'dataLst'){
			//get data
			var resWarehouseWebLst = actionValue;
			
			$("#warehouse-detail").empty();
			$("#warehouse-title").html('Chi tiết kho:');

			


			//add table
			var tableStr = 
			'<table class="uk-table uk-table-small uk-table-divider uk-table-striped uk-table-hover">'+
		        '<thead>'+
		            '<tr>'+
	                		'<th><span class="uk-margin-small-right" uk-icon="icon: list"></span>MÃ&nbsp;SẢN&nbsp;PHẨM</th>'+
		                '<th><span class="uk-margin-small-right" uk-icon="icon: comment"></span>TÊN&nbsp;SẢN&nbsp;PHẨM</th>'+
		                '<th><span class="uk-margin-small-right" uk-icon="icon: comment"></span>BLOCK</th>'+
		                '<th><span class="uk-margin-small-right" uk-icon="icon: comment"></span>SỐ&nbsp;LƯỢNG</th>'+
		            '</tr>'+
		        '</thead>'+
		        '<tbody id="warehouse-detail-table-body">'+

		        '</tbody>'+
		    '</table>';
			$("#warehouse-detail").append(tableStr);

			
			
			//add table row
			resWarehouseWebLst.forEach((item, index) =>{

				var rowStr = 
					'<tr>'+
						'<td>'+item.code_inventory_item+'</td>'+
						'<td>'+item.name_inventory_item+'</td>'+
						'<td>'+item.ordinal+'</td>'+
						'<td>'+(item.inventory_item_num == -1 ? CHAR_INFINITY :item.inventory_item_num)+'</td>'+
					'</tr>';
				$("#warehouse-detail-table-body").append(rowStr);
				
			});	
			
		} else {
			processDataCommon(actionKey, actionValue, id);
		}
	}
}

function getRawData(){
	
	var from = $("#date-picker-from").val();
	var to = $("#date-picker-to").val();
	
	var email = $("#email").val();
	
	if(StringUtil.isEmpty(from) || StringUtil.isEmpty(to) || StringUtil.isEmpty(email)){
		notify('Chưa nhập email hoặc ngày', DANGER);
		return;
	}
	
	UIkit.modal("#waiting-modal").show();
	
	$.ajax({
		url: WEB_V1_REQUEST_RAW_DATA,
		method : POST,
		data : 'from=' + from + '&to=' + to + '&email=' + email,
		success: result => {
			var s = JSON.stringify(result);
			processData(result);
			setInterval(function(){UIkit.modal("#waiting-modal").hide();}, 1000);
		},
		error: error => {
			setInterval(function(){UIkit.modal("#waiting-modal").hide();
				notify('Hệ thống lỗi, vui lòng thử lại sau...', DANGER);
			}, 1000);
			
		}
	});
}

function clearPgNaConditions(){
	$('#pg-na-report-sale-sel').empty();
	$("#pg-na-report-sale-sel").append('<option selected="" value="-1">----</option>');
	
	$("#pg-na-report-ss-sel").val(-1);
}

function getPgNa(){
	
	var dayworkFrom = $("#pg-na-report-date-picker-from").val();
	var dayworkTo = $("#pg-na-report-date-picker-to").val();
	
	if(StringUtil.isEmpty(dayworkFrom) || StringUtil.isEmpty(dayworkTo)){
		notify('Chưa chọn ngày!', DANGER);
		return;
	}
	
	$('#pg-na-report-sale-sel').empty();
	$("#pg-na-report-sale-sel").append('<option selected="" value="-1">----</option>');

	var idStaffS = $("#pg-na-report-ss-sel").val();
	
	
	if(idStaffS == -1){
		notify('Chưa chọn giám sát!', DANGER);
		return;
	}
	
	UIkit.modal("#waiting-modal").show();
	
	$.ajax({
		url: WEB_V1_GET_PG_NA,
		method : POST,
		data : 'idStaffS=' + idStaffS + '&dayworkFrom=' + dayworkFrom + '&dayworkTo=' + dayworkTo,
		success: result => {
			var s = JSON.stringify(result);
			processDataPgNa(result);
			setInterval(function(){UIkit.modal("#waiting-modal").hide();}, 1000);
		},
		error: error => {
			setInterval(function(){UIkit.modal("#waiting-modal").hide();
				notify('Hệ thống lỗi, vui lòng thử lại sau...', DANGER);
			}, 1000);
			
		}
	});
}

function processDataPgNa(result){
	var dataLst = result.data;
	var q = 0;
	for(q = 0;q < dataLst.length;q++){
		var data = dataLst[q];
		var actionKey = data.actionKey;
		var actionValue = data.actionValue;
		var id = data.idElement;

		if(actionKey == 'resPgNaWebLst'){

			for(var i = 0; i < actionValue.length; i++){
				var optionTag = '<option value="'+actionValue[i].key+'">'+actionValue[i].value+'</option>';
				$("#pg-na-report-sale-sel").append(optionTag);
				
			}
			
			
		} else {
			processDataCommon(actionKey, actionValue, id);
		}
	}
}

function getShift(){
	
	
	$("#pg-na-report-table-container").addClass('display-none');
	$("#pg-na-report-table-body").empty();
	var idStaffS = $("#pg-na-report-sale-sel").val();
	
	var dayworkFrom = $("#pg-na-report-date-picker-from").val();
	var dayworkTo = $("#pg-na-report-date-picker-to").val();
	
	
	if(idStaffS == -1){
		notify('Chưa chọn nhân viên!', DANGER);
		return;
	}
	
	if(StringUtil.isEmpty(dayworkFrom) || StringUtil.isEmpty(dayworkTo)){
		notify('Chưa chọn ngày!', DANGER);
		return;
	}
	
	UIkit.modal("#waiting-modal").show();
	
	$("#pg-na-report-get-shift").prop('disabled', true);
	
	setTimeout(function(){
		$("#pg-na-report-get-shift").prop('disabled', false);
	}, 5000);
	
	$.ajax({
		url: WEB_V1_GET_SHIFT,
		method : POST,
		data : 'idStaffS=' + idStaffS + '&dayworkFrom='+dayworkFrom + '&dayworkTo=' + dayworkTo,
		success: result => {
			var s = JSON.stringify(result);
			processDataShift(result);
			setInterval(function(){UIkit.modal("#waiting-modal").hide();}, 1000);
		},
		error: error => {
			setInterval(function(){UIkit.modal("#waiting-modal").hide();
				notify('Hệ thống lỗi, vui lòng thử lại sau...', DANGER);
			}, 1000);
			
		}
	});
}


var shiftMaps = [];
var shiftCircle = [];
var shiftShopMarker = [];
var shiftOpenMarker = [];
var shiftCloseMarker = [];

function processDataShift(result){
	var dataLst = result.data;
	var q = 0;
	for(q = 0;q < dataLst.length;q++){
		var data = dataLst[q];
		var actionKey = data.actionKey;
		var actionValue = data.actionValue;
		var id = data.idElement;

		if(actionKey == 'resShiftWebLst'){

			//remove map and marker
			for(var i = 0; i < shiftMaps.length; i++){
				shiftMaps[i] = null;
			}
			shiftMaps = [];
			
			
			for(var i = 0; i < shiftCircle.length; i++){
				shiftCircle[i] = null;
			}
			shiftCircle = [];
			
			for(var i = 0; i < shiftOpenMarker.length; i++){
				shiftOpenMarker[i].setMap(null);
				shiftOpenMarker[i] = null;
			}
			shiftOpenMarker = [];
			
			for(var i = 0; i < shiftCloseMarker.length; i++){
				shiftCloseMarker[i].setMap(null);
				shiftCloseMarker[i] = null;
			}
			shiftCloseMarker = [];
			
			
			for(var i = 0; i < shiftShopMarker.length; i++){
				shiftShopMarker[i].setMap(null);
				shiftShopMarker[i] = null;
			}
			shiftShopMarker = [];
			
			$("#pg-na-report-table-container").removeClass('display-none');
			
			for(var i = 0; i < actionValue.length; i++){
				$("#pg-na-report-table-body").append('<tr id="pg-na-report-table-row'+i+'"></tr>');
				var shiftInfo = 'Loại ca: <span class="color-red-x">'+actionValue[i].typeShiftTxt+'</span><br/>Tên điểm bán: <span class="color-red-x">' + actionValue[i].namePlace + '</span><br/>' + 'Địa chỉ: ' + actionValue[i].address + '<br/>' + 'Ngày: ' + actionValue[i].daywork + '<br/>' + 'Thực tế mở ca: ' + actionValue[i].openShiftDt + '<br/>' + (actionValue[i].closeShiftDt == null? 'Thực tế đóng ca: -<br/>' :'Thực tế đóng ca: '+ actionValue[i].closeShiftDt + '<br/>') + 'Số giờ làm việc: <span class="color-red-x">' + actionValue[i].workingTime + '</span><br/>'  + 'Trạng thái: ' +  actionValue[i].status + '<br/>' + 'Chấm công: <span id="shift-state-'+actionValue[i].idShift+'" class="bold-x '+(actionValue[i].state == 1?'color-green-x':(actionValue[i].state == 2?'color-red-x':''))+'">'+actionValue[i].stateTxt +' </span><br/>' ;    
				
				
				var reportSamplingDetailLst = actionValue[i].resReportSamplingDetailWebLst;
				if(reportSamplingDetailLst != null){
					shiftInfo = shiftInfo + '<span class="bold-x">Báo cáo sampling/hàng tặng:</span><br/>';
					for(var j = 0; j < reportSamplingDetailLst.length; j++){
						shiftInfo = shiftInfo + reportSamplingDetailLst[j].nameInventoryItem + ' : ' + reportSamplingDetailLst[j].inventoryItemNum + '<br/>';
					}
				}
				
				
				//get report
				var reportWebLst = actionValue[i].resReportWebLst;
				if(reportWebLst != null){
					shiftInfo = shiftInfo + '<span class="bold-x">Báo cáo bán hàng:</span><br/>';
					for(var k = 0; k < reportWebLst.length; k++){

						shiftInfo = shiftInfo + '<span class="bold-x">Khách hàng:</span> '+reportWebLst[k].nameBuyer+'<br/>';
						shiftInfo = shiftInfo + 'Ngày báo cáo: '+reportWebLst[k].reportDt+'<br/>';
						
						var reportDetailWebLst = reportWebLst[k].resReportDetailWebLst;
						
						for(var h = 0; h < reportDetailWebLst.length; h++){
							shiftInfo = shiftInfo + reportDetailWebLst[h].nameInventoryItem + ' : ' + reportDetailWebLst[h].inventoryItemNum+'<br/>';


						}

					}
					
				}
				
				$("#pg-na-report-table-row"+i).append('<td>' + shiftInfo + '</td>');
				$("#pg-na-report-table-row"+i).append('<td><div id="pg-na-report-map-div'+i+'" class="pg-na-report-map-div"></div></td>');
				
				if(actionValue[i].imgData == null){
					$("#pg-na-report-table-row"+i).append('<td><span>Không có hình ảnh</span></td>');
				} else {
					$("#pg-na-report-table-row"+i).append('<td><img src="'+actionValue[i].imgData+'" alt="Hình ảnh mở ca bán" /></td>');
				}
				
				if(actionValue[i].imgData2 == null){
					$("#pg-na-report-table-row"+i).append('<td><span>Không có hình ảnh</span></td>');
				} else {
					$("#pg-na-report-table-row"+i).append('<td><img src="'+actionValue[i].imgData2+'" alt="Hình đóng mở ca bán" /></td>');
				}
				
				var timeKeeping = '';
				if(actionValue[i].state == 0){
					timeKeeping = '<div class="uk-margin"><button id="approve-shift-btn-'+actionValue[i].idShift+'" onclick="approveShift(\''+actionValue[i].idShift+'\');" class="uk-button uk-button-default uk-button-primary">OK</button></div><div class="uk-margin"><button id="reject-shift-btn-'+actionValue[i].idShift+'" onclick="rejectShift(\''+actionValue[i].idShift+'\');" class="uk-button uk-button-default uk-button-danger">NOT&nbsp;OK</button></div>';
				} else if(actionValue[i].state == 1){
					timeKeeping = '<div class="uk-margin"><button id="approve-shift-btn-'+actionValue[i].idShift+'" onclick="approveShift(\''+actionValue[i].idShift+'\');" class="uk-button uk-button-default uk-button-primary display-none">OK</button></div><div class="uk-margin"><button id="reject-shift-btn-'+actionValue[i].idShift+'" onclick="rejectShift(\''+actionValue[i].idShift+'\');" class="uk-button uk-button-default uk-button-danger">NOT&nbsp;OK</button></div>';
				} else if (actionValue[i].state == 2){
					timeKeeping = '<div class="uk-margin"><button id="approve-shift-btn-'+actionValue[i].idShift+'" onclick="approveShift(\''+actionValue[i].idShift+'\');" class="uk-button uk-button-default uk-button-primary">OK</button></div><div class="uk-margin"><button id="reject-shift-btn-'+actionValue[i].idShift+'" onclick="rejectShift(\''+actionValue[i].idShift+'\');" class="uk-button uk-button-default uk-button-danger display-none">NOT&nbsp;OK</button></div>';
				} else {
					timeKeeping = '<div class="uk-margin"><button id="approve-shift-btn-'+actionValue[i].idShift+'" onclick="approveShift(\''+actionValue[i].idShift+'\');" class="uk-button uk-button-default uk-button-primary">OK</button></div><div class="uk-margin"><button id="reject-shift-btn-'+actionValue[i].idShift+'" onclick="rejectShift(\''+actionValue[i].idShift+'\');" class="uk-button uk-button-default uk-button-danger">NOT&nbsp;OK</button></div>';
				}
				
				$("#pg-na-report-table-row"+i).append(timeKeeping);
				
				//add map
				var mapCanvas = $("#pg-na-report-map-div"+i)[0];

		        var center = new google.maps.LatLng(actionValue[i].latitudePlace,actionValue[i].longitudePlace);
		        var mapOptions = {
		            center: center,
		            zoom: MAP_ZOOM,
		            mapTypeControl: false,
		            streetViewControl: false
		        };
		        var locationMap = new google.maps.Map(mapCanvas, mapOptions);
		        shiftMaps.push(locationMap);
		        
		        //add radius
                var shopCircle = new google.maps.Circle({
                    strokeColor: '#00e958',
                    strokeOpacity: 0.8,
                    strokeWeight: 1,
                    fillColor: '#57dc89',
                    fillOpacity: 0.35,
                    map: locationMap,
                    center: center,
                    radius: SHOP_RADIUS
                });
                shiftCircle.push(shopCircle);
				
		        //set marker place
		        var latlng = new google.maps.LatLng(actionValue[i].latitudePlace,actionValue[i].longitudePlace);
                
                var locationShopMaker = placeMarker2(locationMap, latlng, GREEN_DOT);
                locationShopMaker.indexMarker = i;

                var infowindow = new google.maps.InfoWindow({
                    content: 'toạ độ của cửa hàng/điểm bán!'
                });

                locationShopMaker.addListener('click', function() {
                		var index = this.indexMarker;
                    infowindow.open(shiftShopMarker[index], this);
                });
                
                shiftShopMarker.push(locationShopMaker);
                
                //set marker open shift
                var latlng1 = new google.maps.LatLng(actionValue[i].latitudeCheckIn,actionValue[i].longitudeCheckIn);
                
                var locationShopMaker1 = placeMarker2(locationMap, latlng1, RED_DOT);

                var infowindow1 = new google.maps.InfoWindow({
                    content: 'toạ độ mở ca bán!'
                });

                locationShopMaker1.addListener('click', function() {
                    
                    var index = this.indexMarker;
                    infowindow1.open(shiftShopMarker[index], this);
                });
                
                shiftOpenMarker.push(locationShopMaker1);
                
                if(actionValue[i].latitudeCheckOut != null && actionValue[i].longitudeCheckOut != null){
                		//set marker open shift
                    var latlng2 = new google.maps.LatLng(actionValue[i].latitudeCheckOut,actionValue[i].longitudeCheckOut);
                    
                    var locationShopMaker2 = placeMarker2(locationMap, latlng2, RED_DOT);

                    var infowindow2 = new google.maps.InfoWindow({
                        content: 'toạ độ đóng ca bán!'
                    });

                    locationShopMaker2.addListener('click', function() {
                        
                        var index = this.indexMarker;
                        infowindow2.open(shiftShopMarker[index], this);
                    });
                    
                    shiftCloseMarker.push(locationShopMaker2);
                }
				
				
				
			}
			
			
			
			
			
		} else {
			processDataCommon(actionKey, actionValue, id);
		}
	}
}

function approveShift(idShift){
	UIkit.modal("#waiting-modal").show();
	setTimeout(function(){
		
		$.ajax({
			url: WEB_V1_CHANGE_STATE,
			method : POST,
			data: 'idShift=' + idShift + '&state=1',
			success: result => {
				
				processData(result);
				$('#approve-shift-btn-'+idShift).addClass('display-none');
				$('#reject-shift-btn-'+idShift).removeClass('display-none');
				$('#shift-state-'+idShift).text('Hợp lệ');
				$('#shift-state-'+idShift).removeClass('color-red-x');
				$('#shift-state-'+idShift).addClass('color-green-x');
				UIkit.modal("#waiting-modal").hide();
				
			},
			error: error => {
				UIkit.modal("#waiting-modal").hide();
				notify('Hệ thống lỗi, vui lòng thử lại sau...', DANGER);
			}
		});
		
	}, 1500);
}

function rejectShift(idShift){
	UIkit.modal("#waiting-modal").show();
	setTimeout(function(){
		
		$.ajax({
			url: WEB_V1_CHANGE_STATE,
			method : POST,
			data: 'idShift=' + idShift + '&state=2',
			success: result => {
				
				processData(result);
				$('#reject-shift-btn-'+idShift).addClass('display-none');
				$('#approve-shift-btn-'+idShift).removeClass('display-none');
				$('#shift-state-'+idShift).text('Không hợp lệ');
				$('#shift-state-'+idShift).addClass('color-red-x');
				$('#shift-state-'+idShift).removeClass('color-green-x');
				UIkit.modal("#waiting-modal").hide();
				
			},
			error: error => {
				UIkit.modal("#waiting-modal").hide();
				notify('Hệ thống lỗi, vui lòng thử lại sau...', DANGER);
			}
		});
		
	}, 1500);
}

function addCodeOrderCond(){
	var codeOrder = $("#code-order").val().trim();
	if(StringUtil.isEmpty(codeOrder)){
		codeOrder = "";
	}
	$("#order-accepted-cancel-search-btn").attr("href", "/web/v1/get_accepted_cancel_order/" + codeOrder);
}

function getInventoryItem(){
	var idCustomerS = $("#return-promotion-cus-sel").val();
	
	$("#return-promotion-return-text").addClass('display-none');
	$("#return-promotion-detail").addClass('display-none');
	$("#return-promotion-detail-body").empty();
	$("#return-promotion-inventory-num").val(0);
	$("#return-promotion-btn").addClass('display-none');
	
	if(idCustomerS == -1){
		notify('Nhà phân phối chưa được chọn!', 'danger');
		return;
	}
	
	UIkit.modal("#waiting-modal").show();
	
	$.ajax({
		url: WEB_V1_GET_RETURN_PROMOTION_INVENTORY_ITEM,
		method : POST,
		data : 'idCustomerS=' + idCustomerS,
		success: result => {
			var s = JSON.stringify(result);
			processGetInventoryItem(result);
			setInterval(function(){UIkit.modal("#waiting-modal").hide();}, 1000);
		},
		error: error => {
			setInterval(function(){UIkit.modal("#waiting-modal").hide();
				notify('Hệ thống lỗi, vui lòng thử lại sau...', DANGER);
			}, 1000);
			
		}
	});
}


function processGetInventoryItem(result){
	var dataLst = result.data;
	var q = 0;
	for(q = 0;q < dataLst.length;q++){
		var data = dataLst[q];
		var actionKey = data.actionKey;
		var actionValue = data.actionValue;
		var id = data.idElement;

		if(actionKey == 'resData'){

			var sendCustomer = actionValue[0];
			var receivedCustomer = actionValue[1];
			var inventoryItemLst = actionValue[2];
			

			
			$("#return-promotion-send-promotion").text(sendCustomer);
			$("#return-promotion-received-promotion").text(receivedCustomer);
			
			$("#return-promotion-inventory-num").val(inventoryItemLst.length);
			
			for(var i = 0; i < inventoryItemLst.length; i++){
				
				var row = 
				'<tr>'+
		    			'<td>' + inventoryItemLst[i].value + '</td>'+
		    			'<td>'+
		    				'<input id="inventory'+i+'" idinventoryitem="'+inventoryItemLst[i].key+'" type="number"/>'+
		    			'</td>'+
		    		'</tr>';
		    		
		    		$("#return-promotion-detail-body").append(row);
				
			}
			
			$("#return-promotion-return-text").removeClass('display-none');
			$("#return-promotion-detail").removeClass('display-none');
			$("#return-promotion-btn").removeClass('display-none');
			
			
			
		} else {
			processDataCommon(actionKey, actionValue, id);
		}
	}
}


function returnPromotionGood(){
	
	var idInventoryItem = [];
	var inventoryItemNum = [];
	var hasReturnItem = false;
	
	//validate
	var num = $("#return-promotion-inventory-num").val();
	
	for(var i = 0; i < num; i++){
		
		var attr = $("#inventory"+i).attr('idinventoryitem');
		idInventoryItem.push(attr);
		
		var intemNum = $("#inventory"+i).val();
		
		if(StringUtil.isEmpty(intemNum)){
			intemNum = '0';
		}

		if(intemNum < 0){
			notify('Số lượng hàng nhỏ hơn 0!', DANGER);
			return ;
		}
		
		if(intemNum > 0){
			hasReturnItem = true;
		}
		
		inventoryItemNum.push(intemNum);
	}
	
	if(!hasReturnItem){
		notify('Không có hàng trả!', DANGER);
		return ;
	}
	
	var description = $("#return-promotion-description").val();
	if(StringUtil.isEmpty(description)){
		notify('"Lý do" trống!', DANGER);
		return ;
	}
	
	
	var yesNoModal = createYesNoModal('', 'Bạn chắc chắn trả khuyến mãi?', () => {
		
		$('#return-promotion-return-btn').prop('disabled', true);
		
		var dataStr = "description="+description+"&idCustomerS=" + $("#return-promotion-cus-sel").val() + "&idInventoryItem=&inventoryItemNum=";
		for(var i = 0; i < idInventoryItem.length; i++){
			var num = inventoryItemNum[i];
			if(num > 0){
				var id = idInventoryItem[i];
				
				dataStr = dataStr + "&" + "idInventoryItem=" + id;
				dataStr = dataStr + "&" + "inventoryItemNum=" + num;
			}
			
		}
		
		UIkit.modal("#waiting-modal").show();
		
		$.ajax({
			url: WEB_V1_RETURN_PROMOTION,
			method : POST,
			data : dataStr,
			success: result => {
				processData(result);
				setInterval(function(){UIkit.modal("#waiting-modal").hide();}, 1000);
			},
			error: error => {
				setInterval(function(){UIkit.modal("#waiting-modal").hide();
					notify('Hệ thống lỗi, vui lòng thử lại sau...', DANGER);
				}, 1000);
			}
		});
		
	});
	
	yesNoModal.show();
}

function returnPromotionShowDetail(idReturnPromotion){
	$.ajax({
		url: WEB_V1_GET_RETURN_PROMOTION_DETAIL,
		method : POST,
		data : "idReturnPromotion="+idReturnPromotion,
		success: result => {
			
			processDataReturnPromotionShowDetail(result);
			UIkit.modal("#waiting-modal").hide();
			UIkit.modal("#return-promotion-modal").show();
		},
		error: error => {
			UIkit.modal("#waiting-modal").hide();
			notify('Hệ thống lỗi, vui lòng thử lại sau...', DANGER);
		}
	});
}

function processDataReturnPromotionShowDetail(result){
	var dataLst = result.data;
	var q = 0;
	for(q = 0;q < dataLst.length;q++){
		var data = dataLst[q];
		var actionKey = data.actionKey;
		var actionValue = data.actionValue;
		var id = data.idElement;

		if(actionKey == 'dataLst'){
			
			//get data
			var codeReturnPromotion = actionValue[0];
			var resSendGoodWeb2Lst = actionValue[1];
			
			//set code order
			$("#return-promotion-modal-head").html(codeReturnPromotion);
			//empty previous data
			$("#return-promotion-modal-body").empty();
			
			//add table
			var tableStr = 
			'<table class="uk-table uk-table-small uk-table-divider uk-table-striped uk-table-hover">'+
		        '<thead>'+
		            '<tr>'+
	                		'<th><span class="uk-margin-small-right" uk-icon="icon: list"></span>TÊN</th>'+
		                '<th><span class="uk-margin-small-right" uk-icon="icon: comment"></span>SỐ&nbsp;LƯỢNG</th>'+
		                '<th><span class="uk-margin-small-right" uk-icon="icon: comment"></span>GHI&nbsp;CHÚ</th>'+
		            '</tr>'+
		        '</thead>'+
		        '<tbody id="return-promotion-modal-table-body">'+

		        '</tbody>'+
		    '</table>';
			$("#return-promotion-modal-body").append(tableStr);
			
			
			//add table row
			for(var i = 0; i < resSendGoodWeb2Lst.length; i++){

				var rowStr = 
					'<tr>'+
						'<td>'+resSendGoodWeb2Lst[i].name_inventory_item+'</td>'+
						'<td>'+resSendGoodWeb2Lst[i].inventory_item_num+'</td>'+
						'<td>BLOCK '+resSendGoodWeb2Lst[i].ordinal+'</td>'+
					'</tr>';
					$("#return-promotion-modal-table-body").append(rowStr);
				
			}
			
		} else {
			processDataCommon(actionKey, actionValue, id);
		}
	}
}

function getStaff(idStaffS){
	
	setTimeout(function(){
		
		$.ajax({
			url: WEB_V1_GET_STAFF,
			method : POST,
			data : "idStaffS="+idStaffS,
			success: result => {
				
				processDataGetStaff(result);
				UIkit.modal("#waiting-modal").hide();
				UIkit.modal("#edit-staff-modal").show();
			},
			error: error => {
				UIkit.modal("#waiting-modal").hide();
				notify('Hệ thống lỗi, vui lòng thử lại sau...', DANGER);
			}
		});
		
	}, 1500);
	
}


function processDataGetStaff(result){
	var dataLst = result.data;
	var q = 0;
	for(q = 0;q < dataLst.length;q++){
		var data = dataLst[q];
		var actionKey = data.actionKey;
		var actionValue = data.actionValue;
		var id = data.idElement;

		if(actionKey == 'resStaffWeb'){
			
			$("#edit-staff-modal-head").html("Cập nhật thông tin nhân viên");
			//empty previous data
			$("#edit-staff-modal-body").empty();
			
			
			var tableStr = 
				'<table class="uk-table uk-table-small uk-table-divider uk-table-striped uk-table-hover">'+
			        '<thead>'+
			            '<tr>'+
		                		'<th><span class="uk-margin-small-right" uk-icon="icon: list"></span>TRƯỜNG</th>'+
			                '<th><span class="uk-margin-small-right" uk-icon="icon: comment"></span>GIÁ&nbsp;TRỊ&nbsp;HIỆN&nbsp;TẠI</th>'+
			                '<th><span class="uk-margin-small-right" uk-icon="icon: comment"></span>GIÁ&nbsp;TRỊ&nbsp;THAY&nbsp;ĐỔI</th>'+
			            '</tr>'+
			        '</thead>'+
			        '<tbody>'+
			        		'<tr>'+
			        			'<td>Mã</td>'+
			        			'<td>'+actionValue.code_staff_misa+'</td>'+
			        			'<td><input id="edit-staff-code-staff-misa" type="text"/></td>'+
			        		'</tr>'+
			        		
			        		'<tr>'+
			        			'<td>Tên</td>'+
			        			'<td>'+actionValue.name_staff+'</td>'+
			        			'<td></td>'+
			        		'</tr>'+
			        		
			        		'<tr>'+
			        			'<td>Điện thoại</td>'+
			        			'<td>'+actionValue.phone_num+'</td>'+
			        			'<td><input id="edit-staff-phone-num" type="text"/></td>'+
			        		'</tr>'+
			        		
			        		
			        		
			        		'<tr>'+
			        			'<td>Giới tính</td>'+
			        			'<td>'+actionValue.gender+'</td>'+
			        			'<td>'+
			        				'<select id="edit-staff-gender"><option value="">----</option><option value="0">Nam</option><option value="1">Nữ</option></select>'+
			        			'</td>'+
			        		'</tr>'+
			        		
			        		'<tr>'+
			        			'<td>Ngày sinh</td>'+
			        			'<td>'+actionValue.birth_date+'</td>'+
			        			'<td><input readonly="" type="text" id="birth-date-picker"/></td>'+
			        		'</tr>'+
			        		
			        		'<tr>'+
			        			'<td>Địa chỉ</td>'+
			        			'<td>'+actionValue.address+'</td>'+
			        			'<td><input id="edit-staff-address" type="text"/></td>'+
			        		'</tr>'+
			        		
			        		'<tr>'+
			        			'<td>CMND</td>'+
			        			'<td>'+actionValue.id_number+'</td>'+
			        			'<td><input id="edit-staff-id-number" type="text"/></td>'+
			        		'</tr>'+

			        '</tbody>'+
			    '</table>';
			
			$("#edit-staff-modal-body").append(tableStr);
			$("#edit-staff-modal-body").append('<input id="edit-staff-id-staff-s" type="hidden" value="'+ actionValue.id_staff_s +'"/>');
			
			$( "#birth-date-picker" ).datepicker({
				  dateFormat: "dd-mm-yy",
				  dayNamesMin: ['CN', 'T2', 'T3', 'T4', 'T5', 'T6', 'T7'],
				  changeMonth: true,
			      changeYear: true,
				  monthNamesShort: [ "Tng 1", "Tng 2", "Tng 3", "Tng 4",
	                  "Tng 5", "Tng 6", "Tng 7", "Tng 8", "Tng 9",
	                  "Tng 10", "Tng 11", "Tng 12" ],
	              onSelect: function(dateText, inst){
	            	  		
	              }
			  });
			
			
			
			
		} else {
			processDataCommon(actionKey, actionValue, id);
		}
	}
}

function updateStaff(){
	
	//UIkit.modal("#edit-staff-modal").hide();

	var yesNoModal = createYesNoModal('', 'Bạn chắc chắn muốn cập nhật nhân viên?', () => {
		
			var idStaffS = $("#edit-staff-id-staff-s").val();
			var codeStaffMisa = $("#edit-staff-code-staff-misa").val();
			var phoneNum = $("#edit-staff-phone-num").val();
			var gender = $("#edit-staff-gender").val();
			var birthDate = $("#birth-date-picker").val();
			var address = $("#edit-staff-address").val();
			var idNumber = $("#edit-staff-id-number").val();
			
			var dataStr = 'idStaffS=' + idStaffS +'&codeStaffMisa=' + codeStaffMisa + '&phoneNum=' + phoneNum + '&gender=' + gender + '&birthDate=' + birthDate + '&address=' + address + '&idNumber=' + idNumber;
			
			$.ajax({
				url: WEB_V1_UPDATE_STAFF,
				method : POST,
				data : dataStr,
				success: result => {
					processData(result);
					//UIkit.modal("#order-detail-modal").hide();
				},
				error: error => {
					notify('Hệ thống lỗi, vui lòng thử lại sau...', DANGER);
				}
			});
			
		
		
	});
	
	yesNoModal.show();
	
	
}

function modifySearchConditionStaff(){
	
	$("#edit-staff-search-btn").attr("href","/web/v1/get_staff_list/-1/"+$('#edit-staff-search').val());
}

function getInfoForAddPg(){
	UIkit.modal("#waiting-modal").show();
	setTimeout(function(){
		
		$.ajax({
			url: WEB_V1_GET_INFO_FOR_ADD_SALE_PG_NA,
			method : POST,
			success: result => {
				
				processDataGetInfoForAddPg(result);
				UIkit.modal("#waiting-modal").hide();
				UIkit.modal("#add-pg-modal").show();
			},
			error: error => {
				UIkit.modal("#waiting-modal").hide();
				notify('Hệ thống lỗi, vui lòng thử lại sau...', DANGER);
			}
		});
		
	}, 1500);

}



function processDataGetInfoForAddPg(result){
	var dataLst = result.data;
	var q = 0;
	for(q = 0;q < dataLst.length;q++){
		var data = dataLst[q];
		var actionKey = data.actionKey;
		var actionValue = data.actionValue;
		var id = data.idElement;

		if(actionKey == 'resStaffWeb2Lst'){
			
			$("#add-pg-modal-head").html("Thêm PG");
			//empty previous data
			$("#add-pg-modal-body").empty();
			
			var type = 	'<div class="uk-margin">'+
							'<label><input onchange="clearSuperiorOfPG();" value="0" name="add-pg-type" class="uk-radio" type="radio">Tạo mới PG thay thế cho PG cũ nghỉ việc</label><br/>'+
							'<label><input onchange="clearSuperiorOfPG();" value="1" name="add-pg-type" class="uk-radio" type="radio">Tạo mới PG hoàn toàn</label>'+
						'</div>';
			
			var form = 	'<div class="uk-margin"><span>Quản lý trực tiếp</span>'+
							'<select onchange="getPG();" disabled id="add-pg-select-superior" class="uk-select"><option value="-1">----</option>';
								
			for(var i = 0; i < actionValue.length; i++){
				form = form + '<option value="'+actionValue[i].id_staff_s+'">'+actionValue[i].code_job_position + ' - ' +actionValue[i].code_staff_misa + ' - ' + actionValue[i].name_staff +'</option>';
			}
								
			form = form + '</select>'+
						'</div>'+
						
						// render PG cần nghỉ việc
						'<div id="add-pg-select-pg-container" class="uk-margin display-none"><span>PG cần nghỉ việc</span>'+
							'<select disabled id="add-pg-select-pg" class="uk-select"><option value="-1">----</option>'+
							'</select>'+
						'</div>'+
						
						'<div id="add-pg-new-pg-container" class="uk-margin"><span>Tên PG mới</span>'+
							'<input class="uk-input" id="add-pg-new-pg" type="text" />'+
						'</div>';
			
			$("#add-pg-modal-body").append(type);
			$("#add-pg-modal-body").append(form);
			
			$("#add-pg-create-btn").removeClass('display-none');
			
			
			
		} else {
			processDataCommon(actionKey, actionValue, id);
		}
	}
}

function clearSuperiorOfPG(){
	$('#add-pg-select-superior').removeAttr('disabled');
	$('#add-pg-select-superior').val('-1');
	
	$('#add-pg-select-pg').val('-1');
	$('#add-pg-select-pg').prop('disabled', true);
	
	$('#add-pg-new-pg').val('');
	
	
	
	var typeValue = $('input:radio[name=add-pg-type]:checked').val();
	if(typeValue == 0) {
		
		
		$('#add-pg-select-pg-container').removeClass('display-none');
	} else {
		$('#add-pg-select-pg-container').addClass('display-none');
	}
}

function getPG(){
	var idStaffSuperior = $("#add-pg-select-superior").val();
	
	$('#add-pg-select-pg').val('-1');

	if(idStaffSuperior == -1) {
		
		$('#add-pg-select-pg').prop('disabled', true);
		return;
	}
	
	var typeValue = $('input:radio[name=add-pg-type]:checked').val();
	if(typeValue == 1){
		return;
	}
	
	$.ajax({
		url: WEB_V1_GET_PG_NA_2,
		method : POST,
		data : 'idStaffS=' + idStaffSuperior + '&pgNaF=0',
		success: result => {
			
			processDataGetPG(result);
			$('#add-pg-select-pg').removeAttr('disabled');
		},
		error: error => {
			
			notify('Hệ thống lỗi, vui lòng thử lại sau...', DANGER);
		}
	});
}

function processDataGetPG(result){
	var dataLst = result.data;
	var q = 0;
	for(q = 0;q < dataLst.length;q++){
		var data = dataLst[q];
		var actionKey = data.actionKey;
		var actionValue = data.actionValue;
		var id = data.idElement;

		if(actionKey == 'resStaffWeb2Lst'){
			
			
			$('#add-pg-select-pg').empty();
			$('#add-pg-select-pg').append('<option value="-1">----</option>');
			
			for(var i = 0; i < actionValue.length; i++){
				$('#add-pg-select-pg').append('<option value="'+actionValue[i].id_staff_s+'">'+actionValue[i].code_job_position + ' - ' + actionValue[i].code_staff_misa + ' - ' + actionValue[i].name_staff +'</option>');
			}
			
			
		} else {
			processDataCommon(actionKey, actionValue, id);
		}
	}
}


function createPG(){
	var typeValue = $('input:radio[name=add-pg-type]:checked').val();
	
	if(typeValue != 0 && typeValue !=1) {
		notify('Chưa chọn loại tạo mới PG', DANGER);
		return;
	}
	
	var idStaffSuperior = $("#add-pg-select-superior").val();
	
	var idStaffPG = $('#add-pg-select-pg').val();
	
	var pgName = $('#add-pg-new-pg').val();
	
	UIkit.modal("#waiting-modal").show();
	
	var dataStr = 'typeValue=' + typeValue + '&idStaffSuperior=' + idStaffSuperior + '&idStaffPGNA=' + idStaffPG + '&pgNAName=' + pgName + '&createPGNA=0';
	setTimeout(function(){
		
		$.ajax({
			url: WEB_V1_CREATE_PG_NA_2,
			method : POST,
			data: dataStr,
			success: result => {
				
				processData(result);
				UIkit.modal("#waiting-modal").hide();
				
			},
			error: error => {
				UIkit.modal("#waiting-modal").hide();
				notify('Hệ thống lỗi, vui lòng thử lại sau...', DANGER);
			}
		});
		
	}, 1500);
}


function getInfoForAddNa(){
	UIkit.modal("#waiting-modal").show();
	setTimeout(function(){
		
		$.ajax({
			url: WEB_V1_GET_INFO_FOR_ADD_SALE_PG_NA,
			method : POST,
			success: result => {
				
				processDataGetInfoForAddNa(result);
				UIkit.modal("#waiting-modal").hide();
				UIkit.modal("#add-na-modal").show();
			},
			error: error => {
				UIkit.modal("#waiting-modal").hide();
				notify('Hệ thống lỗi, vui lòng thử lại sau...', DANGER);
			}
		});
		
	}, 1500);

}

function processDataGetInfoForAddNa(result){
	var dataLst = result.data;
	var q = 0;
	for(q = 0;q < dataLst.length;q++){
		var data = dataLst[q];
		var actionKey = data.actionKey;
		var actionValue = data.actionValue;
		var id = data.idElement;

		if(actionKey == 'resStaffWeb2Lst'){
			
			$("#add-na-modal-head").html("Thêm NA");
			//empty previous data
			$("#add-na-modal-body").empty();
			
			var type = 	'<div class="uk-margin">'+
							'<label><input onchange="clearSuperiorOfNA();" value="0" name="add-na-type" class="uk-radio" type="radio">Tạo mới NA thay thế cho NA cũ nghỉ việc</label><br/>'+
							'<label><input onchange="clearSuperiorOfNA();" value="1" name="add-na-type" class="uk-radio" type="radio">Tạo mới NA hoàn toàn</label>'+
						'</div>';
			
			var form = 	'<div class="uk-margin"><span>Quản lý trực tiếp</span>'+
							'<select onchange="getNA();" disabled id="add-na-select-superior" class="uk-select"><option value="-1">----</option>';
								
			for(var i = 0; i < actionValue.length; i++){
				form = form + '<option value="'+actionValue[i].id_staff_s+'">'+actionValue[i].code_job_position + ' - ' +actionValue[i].code_staff_misa + ' - ' + actionValue[i].name_staff +'</option>';
			}
								
			form = form + '</select>'+
						'</div>'+
						
						// render NA cần nghỉ việc
						'<div id="add-na-select-na-container" class="uk-margin display-none"><span>NA cần nghỉ việc</span>'+
							'<select disabled id="add-na-select-na" class="uk-select"><option value="-1">----</option>'+
							'</select>'+
						'</div>'+
						
						'<div id="add-na-new-na-container" class="uk-margin"><span>Tên NA mới</span>'+
							'<input class="uk-input" id="add-na-new-na" type="text" />'+
						'</div>';
			
			$("#add-na-modal-body").append(type);
			$("#add-na-modal-body").append(form);
			
			$("#add-na-create-btn").removeClass('display-none');
			
			
			
		} else {
			processDataCommon(actionKey, actionValue, id);
		}
	}
}

function clearSuperiorOfNA(){
	$('#add-na-select-superior').removeAttr('disabled');
	$('#add-na-select-superior').val('-1');
	
	$('#add-na-select-na').val('-1');
	$('#add-na-select-na').prop('disabled', true);
	
	$('#add-na-new-na').val('');
	
	
	
	var typeValue = $('input:radio[name=add-na-type]:checked').val();
	if(typeValue == 0) {
		
		
		$('#add-na-select-na-container').removeClass('display-none');
	} else {
		$('#add-na-select-na-container').addClass('display-none');
	}
}

function getNA(){
	var idStaffSuperior = $("#add-na-select-superior").val();
	
	$('#add-na-select-na').val('-1');

	if(idStaffSuperior == -1) {
		
		$('#add-na-select-na').prop('disabled', true);
		return;
	}
	
	var typeValue = $('input:radio[name=add-na-type]:checked').val();
	if(typeValue == 1){
		return;
	}
	
	$.ajax({
		url: WEB_V1_GET_PG_NA_2,
		method : POST,
		data : 'idStaffS=' + idStaffSuperior + '&pgNaF=1',
		success: result => {
			
			processDataGetNA(result);
			$('#add-na-select-na').removeAttr('disabled');
		},
		error: error => {
			
			notify('Hệ thống lỗi, vui lòng thử lại sau...', DANGER);
		}
	});
}

function processDataGetNA(result){
	var dataLst = result.data;
	var q = 0;
	for(q = 0;q < dataLst.length;q++){
		var data = dataLst[q];
		var actionKey = data.actionKey;
		var actionValue = data.actionValue;
		var id = data.idElement;

		if(actionKey == 'resStaffWeb2Lst'){
			
			
			$('#add-na-select-na').empty();
			$('#add-na-select-na').append('<option value="-1">----</option>');
			
			for(var i = 0; i < actionValue.length; i++){
				$('#add-na-select-na').append('<option value="'+actionValue[i].id_staff_s+'">'+actionValue[i].code_job_position + ' - ' + actionValue[i].code_staff_misa + ' - ' + actionValue[i].name_staff +'</option>');
			}
			
			
		} else {
			processDataCommon(actionKey, actionValue, id);
		}
	}
}


function createNA(){
	var typeValue = $('input:radio[name=add-na-type]:checked').val();
	
	if(typeValue != 0 && typeValue !=1) {
		notify('Chưa chọn loại tạo mới NA', DANGER);
		return;
	}
	
	var idStaffSuperior = $("#add-na-select-superior").val();
	
	var idStaffNA = $('#add-na-select-na').val();
	
	var naName = $('#add-na-new-na').val();
	
	UIkit.modal("#waiting-modal").show();
	
	var dataStr = 'typeValue=' + typeValue + '&idStaffSuperior=' + idStaffSuperior + '&idStaffPGNA=' + idStaffNA + '&pgNAName=' + naName + '&createPGNA=1';
	setTimeout(function(){
		
		$.ajax({
			url: WEB_V1_CREATE_PG_NA_2,
			method : POST,
			data: dataStr,
			success: result => {
				
				processData(result);
				UIkit.modal("#waiting-modal").hide();
				
			},
			error: error => {
				UIkit.modal("#waiting-modal").hide();
				notify('Hệ thống lỗi, vui lòng thử lại sau...', DANGER);
			}
		});
		
	}, 1500);
}

function getInfoForAddSale(){
	UIkit.modal("#waiting-modal").show();
	setTimeout(function(){
		
		$.ajax({
			url: WEB_V1_GET_INFO_FOR_ADD_SALE_PG_NA,
			method : POST,
			success: result => {
				
				processDataGetInfoForAddSale(result);
				UIkit.modal("#waiting-modal").hide();
				UIkit.modal("#add-sale-modal").show();
			},
			error: error => {
				UIkit.modal("#waiting-modal").hide();
				notify('Hệ thống lỗi, vui lòng thử lại sau...', DANGER);
			}
		});
		
	}, 1500);

}


function processDataGetInfoForAddSale(result){
	var dataLst = result.data;
	var q = 0;
	for(q = 0;q < dataLst.length;q++){
		var data = dataLst[q];
		var actionKey = data.actionKey;
		var actionValue = data.actionValue;
		var id = data.idElement;

		if(actionKey == 'resStaffWeb2Lst'){
			
			$("#add-sale-modal-head").html("Thêm Sale");
			//empty previous data
			$("#add-sale-modal-body").empty();
			
			var type = 	'<div class="uk-margin">'+
							'<label><input onchange="clearSuperiorOfSale();" value="0" name="add-sale-type" class="uk-radio" type="radio">Tạo mới sale thay thế cho sale cũ nghỉ việc</label><br/>'+
							'<label><input onchange="clearSuperiorOfSale();" value="1" name="add-sale-type" class="uk-radio" type="radio">Tạo mới sale hoàn toàn</label>'+
						'</div>';
			
			var form = 	'<div class="uk-margin"><span>Quản lý trực tiếp</span>'+
							'<select onchange="getSale();" disabled id="add-sale-select-superior" class="uk-select"><option value="-1">----</option>';
								
			for(var i = 0; i < actionValue.length; i++){
				form = form + '<option value="'+actionValue[i].id_staff_s+'">'+actionValue[i].code_job_position + ' - ' +actionValue[i].code_staff_misa + ' - ' + actionValue[i].name_staff +'</option>';
			}
								
			form = form + '</select>'+
						'</div>'+
						
						// render sale cần nghỉ việc
						'<div id="add-sale-select-sale-container" class="uk-margin display-none"><span>Sale cần nghỉ việc</span>'+
							'<select disabled id="add-sale-select-sale" class="uk-select"><option value="-1">----</option>'+
							'</select>'+
						'</div>'+
						
						'<div id="add-sale-new-sale-container" class="uk-margin"><span>Tên Sale mới</span>'+
							'<input class="uk-input" id="add-sale-new-sale" type="text" />'+
						'</div>';
			
			$("#add-sale-modal-body").append(type);
			$("#add-sale-modal-body").append(form);
			
			$("#add-sale-create-btn").removeClass('display-none');
			
			
			
		} else {
			processDataCommon(actionKey, actionValue, id);
		}
	}
}

function clearSuperiorOfSale(){
	$('#add-sale-select-superior').removeAttr('disabled');
	$('#add-sale-select-superior').val('-1');
	
	$('#add-sale-select-sale').val('-1');
	$('#add-sale-select-sale').prop('disabled', true);
	
	$('#add-sale-new-sale').val('');
	
	
	
	var typeValue = $('input:radio[name=add-sale-type]:checked').val();
	if(typeValue == 0) {
		
		
		$('#add-sale-select-sale-container').removeClass('display-none');
	} else {
		$('#add-sale-select-sale-container').addClass('display-none');
	}
}

function getSale(){
	var idStaffSuperior = $("#add-sale-select-superior").val();
	
	$('#add-sale-select-sale').val('-1');

	if(idStaffSuperior == -1) {
		
		$('#add-sale-select-sale').prop('disabled', true);
		return;
	}
	
	var typeValue = $('input:radio[name=add-sale-type]:checked').val();
	if(typeValue == 1){
		return;
	}
	
	$.ajax({
		url: WEB_V1_GET_SALE,
		method : POST,
		data : 'idStaffS=' + idStaffSuperior,
		success: result => {
			
			processDataGetSale(result);
			$('#add-sale-select-sale').removeAttr('disabled');
		},
		error: error => {
			
			notify('Hệ thống lỗi, vui lòng thử lại sau...', DANGER);
		}
	});
}

function processDataGetSale(result){
	var dataLst = result.data;
	var q = 0;
	for(q = 0;q < dataLst.length;q++){
		var data = dataLst[q];
		var actionKey = data.actionKey;
		var actionValue = data.actionValue;
		var id = data.idElement;

		if(actionKey == 'resStaffWeb2Lst'){
			
			
			$('#add-sale-select-sale').empty();
			$('#add-sale-select-sale').append('<option value="-1">----</option>');
			
			for(var i = 0; i < actionValue.length; i++){
				$('#add-sale-select-sale').append('<option value="'+actionValue[i].id_staff_s+'">'+actionValue[i].code_job_position + ' - ' + actionValue[i].code_staff_misa + ' - ' + actionValue[i].name_staff +'</option>');
			}
			
			
		} else {
			processDataCommon(actionKey, actionValue, id);
		}
	}
}

function createSale(){
	var typeValue = $('input:radio[name=add-sale-type]:checked').val();
	
	if(typeValue != 0 && typeValue !=1) {
		notify('Chưa chọn loại tạo mới sale', DANGER);
		return;
	}
	
	var idStaffSuperior = $("#add-sale-select-superior").val();
	
	var idStaffSale = $('#add-sale-select-sale').val();
	
	var saleName = $('#add-sale-new-sale').val();
	
	UIkit.modal("#waiting-modal").show();
	
	var dataStr = 'typeValue=' + typeValue + '&idStaffSuperior=' + idStaffSuperior + '&idStaffSale=' + idStaffSale + '&saleName=' + saleName ;
	setTimeout(function(){
		
		$.ajax({
			url: WEB_V1_CREATE_SALEMAN_2,
			method : POST,
			data: dataStr,
			success: result => {
				
				processData(result);
				UIkit.modal("#waiting-modal").hide();
				
			},
			error: error => {
				UIkit.modal("#waiting-modal").hide();
				notify('Hệ thống lỗi, vui lòng thử lại sau...', DANGER);
			}
		});
		
	}, 1500);
}

function getPgNaReportRawData(){
	 var from = $('#pg-na-report-date-picker-from').val();
	 var to = $('#pg-na-report-date-picker-to').val();
	 var email = $('#pg-na-report-email').val();
	 
	 if(StringUtil.isEmpty(from)){
		 notify('Chưa chọn ngày bắt đầu', DANGER);
		 return;
	 }
	 
	 if(StringUtil.isEmpty(to)){
		 notify('Chưa chọn ngày kết thúc', DANGER);
		 return;
	 }
	 
	 if(StringUtil.isEmpty(email)){
		 notify('Chưa nhập email', DANGER);
		 return;
	 }
	 
	 UIkit.modal("#waiting-modal").show();
	 
	 var dataStr = 'from=' + from + '&to=' + to + '&email=' + email;
	 
	 $('#pg-na-report-raw-data-btn').prop('disabled', true);
	
	 setTimeout(function(){
		 $("#pg-na-report-raw-data-btn").prop('disabled', false);
	 }, 60000);
	 
	 setTimeout(function(){
		
		$.ajax({
			url: WEB_V1_REQUEST_RAW_DATA_PGNA_SHIFT,
			method : POST,
			data: dataStr,
			success: result => {
				
				processData(result);
				UIkit.modal("#waiting-modal").hide();
				
			},
			error: error => {
				UIkit.modal("#waiting-modal").hide();
				notify('Hệ thống lỗi, vui lòng thử lại sau...', DANGER);
			}
		});
		
	 }, 500);
} 

function lockAccount(){
	var idStaffS = $("#edit-staff-id-staff-s").val();
	
	UIkit.modal("#waiting-modal").show();
	
	setTimeout(function(){
		
		$.ajax({
			url: WEB_V1_ACCOUNT_STATUS_CHANGE,
			method : POST,
			data: 'idStaffS=' + idStaffS + '&status=0',
			success: result => {
				
				processData(result);
				UIkit.modal("#waiting-modal").hide();
				
			},
			error: error => {
				UIkit.modal("#waiting-modal").hide();
				notify('Hệ thống lỗi, vui lòng thử lại sau...', DANGER);
			}
		});
		
	}, 1500);
}

function unlockAccount(){
	var idStaffS = $("#edit-staff-id-staff-s").val();
	
	UIkit.modal("#waiting-modal").show();
	
	setTimeout(function(){
		
		$.ajax({
			url: WEB_V1_ACCOUNT_STATUS_CHANGE,
			method : POST,
			data: 'idStaffS=' + idStaffS + '&status=1',
			success: result => {
				
				processData(result);
				UIkit.modal("#waiting-modal").hide();
				
			},
			error: error => {
				UIkit.modal("#waiting-modal").hide();
				notify('Hệ thống lỗi, vui lòng thử lại sau...', DANGER);
			}
		});
		
	}, 1500);
}






function genPDF(){
	$("html").scrollTop(0);
	$('#down-pdf').html('<div uk-spinner="" class="uk-spinner uk-icon"><svg width="30" height="30" viewBox="0 0 30 30" xmlns="http://www.w3.org/2000/svg" ratio="1"><circle fill="none" stroke="#000" cx="15" cy="15" r="14"></circle></svg></div>');
	$("#down-pdf").prop('disabled', true);
	$('#pdf-order').empty();
	
	var rowNum = $('#table-pdf tbody >tr').length,
    px = (1000 + rowNum * 100)+"px";
	
	$('#order-detail-modal-body-pdf').css('max-height',px);
	$('.pdf-order__style').removeClass('display-none');
	$('.pdf-order__style').addClass('display-block');
 
    //-------------------------------------------------------   
    var n =[];
       var count = 0;
       var subArray = [];
       var index = 0;
       for (var i = 0; i < rowNum; i++){
       	    	 	
    	   		var e = $('#order-detail-modal-body table tbody >tr').get(i);
          	var emsp = e.cells[0].innerText;
          	var etsp = e.cells[1].innerText;
          	var egia = e.cells[2].innerText;
          	var esld = e.cells[3].innerText;
          	var eslkm = e.cells[4].innerText;
          	
          	var Degia = formatCurrency(e.cells[2].innerText);
          	var Desld = formatCurrency(e.cells[3].innerText);
          	var Deslkm = formatCurrency(e.cells[4].innerText);
          	
	   		var Ntien = Number(egia);
	   		var NsoLuong = Number(esld);
	   		var tongTien = Ntien*NsoLuong; 
	   		var DtongTien = formatCurrency(tongTien);
	   		var e2 = '<td>'+emsp+'</td>'+
          			'<td>'+etsp+'</td>'+
          			'<td  style="text-align: end;">'+Degia+'</td>'+
          			'<td  style="text-align: end;">'+Desld+'</td>'+
          			'<td  style="text-align: end;">'+Deslkm+'</td>'+
          			'<td  style="text-align: end;">'+DtongTien+'</td>';

          	var e1 = '<tr>'+e2+'</tr>';		//tr

       	subArray.push(e1);
       	//n[i]=e1;
       	if(count == 19){
       		count =-1;
   			n[index++] = subArray;
   			subArray = [];
       	}     	
       	count ++;    	
       }
   	
   	if(rowNum % 20 != 0){
   		   n[index++] = subArray;
   	}

       var page = n.length;
       
       //get received order info
       var orderTargetArr = $('#order-detail-order-target').val().split('@');
       
       
       
       //get order tsrget info
       
       var orderReceivedArr = $('#order-detail-order-received').val().split('@');
       var mst =  $('#order-detail-order-received-mst').val();  
       
	
	//-------------------------------------------------------
	  for (var i = 0; i<page; i++){
		  var pageContent=n[i];
		  var str1 ="";
		  var footerPage = "";
		  var thead = $('#order-detail-modal-body table thead').get()[0].outerHTML;
		 
		  //header Page
		  if(i==0){
			  var date = new Date();
			  var day = date.getDate();
			  var year = date.getFullYear();
			  var mo = date.getMonth();
			  if (mo==0) {
				  var month =12;
				  } else {
					  month=mo+1;
				  }
			    
			  var codeOrder = $('#order-detail-modal-head').text();
	
			  var codeOrderUser = $('#order-detail-modal-body').get()[0].children[0].outerHTML;
			  var orderUser = $('#order-detail-modal-body').get()[0].children[1].outerHTML;
			  var phone = $('#order-detail-modal-body').get()[0].children[2].outerHTML;
			  var orderReceivedArr1 = orderReceivedArr[1];
			  var orderReceivedArr2 = orderReceivedArr[2];
			  var orderTargetArr0 = orderTargetArr[0];
			  var orderTargetArr1 = orderTargetArr[1];
			  var orderTargetArr2 = orderTargetArr[2];
			  
			  orderReceivedArr2 = '<span>'+orderReceivedArr2+'</span><br>';
			  
			  if(orderReceivedArr[1]=='null'){orderReceivedArr1=''};
			  if(orderReceivedArr[2]=='null'){orderReceivedArr2=''};
			  if(orderTargetArr[0]=='null'){orderTargetArr0=''};
			  if(orderTargetArr[1]=='null'){orderTargetArr1=''};
			  if(orderTargetArr[2]=='null'){orderTargetArr2=''};

			  if(codeOrderUser=='<div><b>Mã NV:</b> null</div>'){codeOrderUser='<div><b>Mã NV:</b> </div>'};

			  var mstHtml = '';
			  if(StringUtil.isNotEmpty(mst)){
				  mstHtml = '<span>Mã số thuế: '+mst+'</span><br>';
			  }
			  
			  str1 = '<div class="order-detail-modal-pdf-order-header">'+
						'<div class="order-detail-modal-pdf-order-header-company">'+
							'<b>'+orderReceivedArr1+'</b><br>' +
							orderReceivedArr2 +
							mstHtml +
						'</div>' +
						'<div class="order-detail-modal-pdf-order-header-title">' +
							'<h4><b>PHIẾU XUẤT KHO KIÊM VẬN CHUYỂN NỘI BỘ</b></h4>' +
							'<div class="date"><b>Ngày: '+day+'/'+month+'/'+year+'</b></div>' +
							'<div class="md"><b>Mã đơn: '+codeOrder+'</b></div>' +
							
						'</div>' +
						'<div class="order-detail-modal-pdf-order-header-info">' +
							'<div class="order-detail-modal-pdf-order-header-info-customer">' +
								'<b>Mã khách hàng: </b>' + orderTargetArr0 +
								'<div><b>Tên khách hàng: </b>'+orderTargetArr1+'</div>' +
								'<div><b>Địa chỉ: </b>'+orderTargetArr2+'</div>' +
							'</div>' +
							'<div class="order-detail-modal-pdf-order-header-info-staff">' +
								codeOrderUser +
								orderUser +
								phone +
							'</div>' +
						'</div>' +
					'</div>';
		  }
		  
		  //footer Page
		  if(i==(page-1)){
				var moneyTotal = $('#order-detail-money-total').get()[0].outerHTML;
				
				//------------------------------
				var innerPromotion = '';
				var pSpan = '';
				var pText = '';
				var pMoney = '';
				var pSum = 0;
				
				var promotionNum = $('#promotion-check').get()[0].children.length;
				
				var hasKM01 = false;
				
				for(var k=0; k<promotionNum;k++){
					
					var Text = $('#promotion-check').get()[0].children[k].children[0].childNodes[1].textContent;
					
					if(Text.includes("KM01") == true){
						hasKM01 = true;
					}

					if(Text.includes("KM01") == false){
						var pCk = $('#promotion-check').get()[0].children[k].children[0].childNodes[2].innerText;
						var pText = $('#promotion-check').get()[0].children[k].children[0].childNodes[1].textContent;
						var moneyResultTotal = $('#money-result-total-real').val();
						var DpMoney = '';
						var DpMonei = '';
						//tính thành tiền ck
						if(pCk.includes("%") == true){
							pMoney = (moneyResultTotal*parseFloat(pCk)/100);
							DpMonei = pCk;
						}else{
							pMoney = parseInt(pCk);	
							DpMonei = formatCurrency(pMoney) + ' VND ';
						}
						Dpmoney = formatCurrency(pMoney);
						pSum += pMoney;
						
							DpMoney = formatCurrency(pMoney);
					innerPromotion += '<tr><td>'+ pText + '</td>'+
										  '<td style="text-align: end;">'+ DpMonei  + '</td>'+
										  '<td style="text-align: end;">'+ Dpmoney + '</td></tr>';

					}
				}
				var moneyPromotion = '';
				
					if(innerPromotion == ''){
						moneyPromotion = '';
					}else{
						var	theadPromotion = '<thead >'+
											'<tr>'+
											'<th class="th-style" style="width: 65%;">TÊN KHUYẾN MÃI</th>'+
											'<th class="th-style">CK</th>'+
											'<th class="th-style">TIỀN CK</th>'+
											'</tr>'+
											'</thead>'
										
						moneyPromotion = '<table>'+ theadPromotion +
										'<tbody>'+innerPromotion+'</tbody></table>';			
					}
								
				//------------------------------
				
				var moneyDiscount = '';
				var moneySpeech = '<div>Số tiền bằng chữ: '+DOCSO.doc($('#money-result-total-real').val())+' đồng</div>';
					
				if(promotionNum != 0 && !(promotionNum == 1 && hasKM01)){
					var finalMoneyResultTotal = moneyResultTotal - pSum;
					moneyDiscount = '<div id="order-detail-money-discount" class="text-align-right-x bold-x">Tổng thanh toán (đã trừ khuyến mãi) : <span id="money-discount-total">'+(formatCurrency(finalMoneyResultTotal))+'</span> </div>'
					moneySpeech = '<div>Số tiền bằng chữ: '+DOCSO.doc(finalMoneyResultTotal)+' đồng</div>';
				}
				
				//
				
							
				//------------------------------
				
				var sign = '<div class="order-detail-modal-pdf-order-footer">'+
								'<div class="nlp order-detail-modal-pdf-order-footer-child">'+
									'<b>Người lập phiếu</b><br>'+
									'<span><i>(Ký, họ tên)</i></span>'+
								'</div>'+
					
								'<div class="tkh order-detail-modal-pdf-order-footer-child">'+
									'<b>Thủ kho</b><br>'+
									'<span><i>(Ký, họ tên)</i></span>'+
								'</div>'+
					
								'<div class="kha order-detail-modal-pdf-order-footer-child">'+
									'<b>Khách hàng</b><br>'+
									'<span><i>(Ký, họ tên)</i></span>'+
								'</div>'+
					
								'<div class="ktt order-detail-modal-pdf-order-footer-child">'+
									'<b>Kế toán trưởng</b><br>'+
									'<span><i>(Ký, họ tên)</i></span>'+
								'</div>'+
							'</div>';				
				var footerPage = moneyTotal + moneyPromotion + moneyDiscount + moneySpeech + sign;				
			}
		  
		  
		  var  str = '<div id="page'+i+'-pdf" class="order-detail-modal-pdf-order-body">' + str1 +
				      	'<table class="uk-table uk-table-small order-detail-modal-pdf-order-table">'+
				      	thead +
				      		'<tbody>';
		  
				      		for(var j=0; j<pageContent.length; j++){
				      			str += pageContent[j];
				      		}  								        	
			str = str +			'</tbody>'+
						'</table>'+footerPage+							
					'</div>';
			
			$('#pdf-order').append(str);
	  }
	  

		$('#pdf-order .r-ico').remove();
		$('#pdf-order .msp').text('MÃ');
		$('#pdf-order .tsp').text('TÊN');
		$('#pdf-order .slkm').text('SL KM');
		$('#pdf-order .sld').text('SL ĐẶT');
			
		$('#pdf-order table th').addClass('th-style');
		$('#pdf-order #order-detail-money-total').removeClass('color-red-x');
		$('#pdf-order #order-detail-money-promotion label span').removeClass('color-red-x');	
		$('#pdf-order .order-detail-modal-pdf-order-table thead tr').append('<th class="th-style"><span class="tt">Thành tiền</span></th>');

		
	  //-------------------------
		var doc = new jsPDF('p', 'mm', 'a4', true,{unit:"px"});  
		doc.internal.pageSize.setWidth(794);
		doc.internal.pageSize.setHeight(1123);
	    doc.internal.scaleFactor=5;
		dequy(0, page, doc);

		  //-------------------------
		setTimeout(() => {
			$('.pdf-order__style').addClass('display-none');
			$('.pdf-order__style').removeClass('display-block');
			$('#down-pdf').text('Tải PDF');
			$("#down-pdf").prop('disabled', false);
		}, (page*1000));
}


function addOrderStatusCond(){
	var href = $("#order-accepted-cancel-filter-btn").attr('href');
	var hrefArr = href.split('/');
	
	var rebuildHref = '';
	for(var i = 1; i < hrefArr.length - 1; i++){
		rebuildHref += '/' + hrefArr[i];
	}
	
	var orderStatusRadio = $("#order-status-radio:checked");
	$("#order-accepted-cancel-filter-btn").attr("href", rebuildHref + '/' + orderStatusRadio.val());
}

function showLiquidationProcess(){
	var idDis = $('#liquidation-cus-sel').val();
	
	$('#liquidation-register').addClass('display-none');
	$('#liquidation-return-good-text').addClass('display-none');
	$('#liquidation-return-good').addClass('display-none');
	$('#liquidation-finish').addClass('display-none');
	$('#liquidation-register-customer-name').addClass('display-none');
	$('#liquidation-return-good-body').empty();
	
	if(idDis == -1){
		alert('Bạn chưa chọn nhà phân phối!');
		return;
	}
	
	UIkit.modal("#waiting-modal").show();
	
	setTimeout(function(){
		
		$.ajax({
			url: WEB_V1_GET_LIQUIDATION_STATUS_DISTRIBUTOR,
			method : POST,
			data: 'idCustomerS=' + idDis,
			success: result => {
				
				processDataShowLiquidationProcess(result);
				UIkit.modal("#waiting-modal").hide();
				
			},
			error: error => {
				UIkit.modal("#waiting-modal").hide();
				notify('Hệ thống lỗi, vui lòng thử lại sau...', DANGER);
			}
		});
		
	}, 1500);
}


function processDataShowLiquidationProcess(result){
	var dataLst = result.data;
	var q = 0;
	for(q = 0;q < dataLst.length;q++){
		var data = dataLst[q];
		var actionKey = data.actionKey;
		var actionValue = data.actionValue;
		var id = data.idElement;

		if(actionKey == 'resData'){
			
			
			$('#liquidation-option').removeClass('display-none');
			
			var liquidation_status = actionValue[0];
			var name_customer_need_liquidation = actionValue[1];
			var name_customer_received_good = actionValue[2];
			var id_inventory_item_lst = actionValue[3];
			var inventory_item_lst = actionValue[4];
			var id_price_history_lst = actionValue[5];

			$('.liquidation-register-customer-name-send').html(name_customer_need_liquidation);
			$('#liquidation-received-good-text').html(name_customer_received_good);
			
			$('#liquidation-send-good-body').empty();
			
			$('#liquidation-send-good-body').append('<input id="inventory_item_price_history_lst" type="hidden" value="'+id_inventory_item_lst+'" />');
			
			var row = null;
			
			var inventoryNum1 = 'inventory-item-num-';
			
			for(var i = 0; i < inventory_item_lst.length; i++){
				
				
				for(var j = 0; j < inventory_item_lst[i].price_lst.length; j++){
					row = 	'<tr>'+
								'<td>'+
									inventory_item_lst[i].name_inventory_item + (id_price_history_lst.includes(inventory_item_lst[i].price_lst[j].id_price)?" (hàng giá cũ)":"") +
								'</td>'+
								'<td>'+
									inventory_item_lst[i].price_lst[j].price;
					row = row +		'</td>'+
								'<td><input id="{0}'+inventory_item_lst[i].id_inventory_item+'_'+inventory_item_lst[i].price_lst[j].id_price+'" type="number" /></td>'+
							'</tr>';
					
					
					
					row = row.replace('{0}', inventoryNum1);
					
					$('#liquidation-send-good-body').append(row);
					
					
				}
				
			}
			
			var radioArr = $('.liquidation-option-type');
			for(var i = 0; i < radioArr.length; i++){
				radioArr[i].checked = false;
			}
			
			$('#liquidation-register-customer-name').addClass('display-none');
			$('#liquidation-send-received-good').addClass('display-none');
			$('#liquidation-send-good').addClass('display-none');
			$('#liquidation-register2').addClass('display-none');
			
			
		} else {
			processDataCommon(actionKey, actionValue, id);
		}
	}
}

function registerLiquidation(){

	var idDis = $('#liquidation-cus-sel').val();
	
	if(idDis == -1){
		alert('Bạn chưa chọn nhà phân phối!');
		return;
	}
	
	$('#liquidation-register-btn').prop('disabled', true);
	
	UIkit.modal("#waiting-modal").show();
	
	setTimeout(function(){
		
		$.ajax({
			url: WEB_V1_REGISTER_LIQUIDATION,
			method : POST,
			data: 'idCustomerS=' + idDis,
			success: result => {
				
				processData(result);
				UIkit.modal("#waiting-modal").hide();
				
			},
			error: error => {
				UIkit.modal("#waiting-modal").hide();
				notify('Hệ thống lỗi, vui lòng thử lại sau...', DANGER);
			}
		});
		
	}, 1500);
}


function finishLiquidationProcessing(){
	$('#finish-liquidation-btn').prop('disabled', true);
	var idDis = $('#finish-liquidation-cus-sel').val();
	
	if(idDis == -1){
		alert('Bạn chưa chọn nhà phân phối!');
		return;
	}
	
	UIkit.modal("#waiting-modal").show();
	
	var inventoryItemPriceHistoryLst = $('#inventory_item_price_history_lst').val();
	var  inventoryItemPriceHistory = inventoryItemPriceHistoryLst.split(',');
	
	var param = '';
	var param2 = '';
	for(var i = 0; i < inventoryItemPriceHistory.length; i++){
		if(i != 0) {
			param = param + '&';
			param2 = param2 + '&';
		}
		param = param + 'inventoryItemPriceHistory='+inventoryItemPriceHistory[i];
		var num = $('#inventory-item-num-'+inventoryItemPriceHistory[i]).val();
		param = param + '&inventoryItemPriceHistoryNum='+((StringUtil.isEmpty(num) || num == undefined)?0:num);
		
		param2 = param2 + 'inventoryItemPriceHistory2='+inventoryItemPriceHistory[i];
		var num2 = $('#inventory-item-num2-'+inventoryItemPriceHistory[i]).val();
		param2 = param2 + '&inventoryItemPriceHistoryNum2='+((StringUtil.isEmpty(num2) || num2 == undefined)?0:num2);
	}
	
	setTimeout(function(){
		
		$.ajax({
			url: WEB_V1_FINISH_LIQUIDATION_PROCESS,
			method : POST,
			data: 'idCustomerS=' + idDis  + '&' + param + '&' + param2,
			success: result => {
				
				processData(result);
				UIkit.modal("#waiting-modal").hide();
				
			},
			error: error => {
				UIkit.modal("#waiting-modal").hide();
				notify('Hệ thống lỗi, vui lòng thử lại sau...', DANGER);
			}
		});
		
	}, 1500);
}

function showLiquidationOptionBtn(){
	var liquidationOptionType = $("#liquidation-option-type:checked").val();
	
	if(liquidationOptionType == 0){
		$('#liquidation-register').addClass('display-none');
		$('#liquidation-register2').removeClass('display-none');
		$('#liquidation-register-customer-name').removeClass('display-none');
		$('#liquidation-send-received-good').removeClass('display-none');
		$('#liquidation-send-good').removeClass('display-none');
		
		
		
		
		
	} else if(liquidationOptionType == 1 || liquidationOptionType == 2){
		$('#liquidation-register2').addClass('display-none');
		$('#liquidation-register').removeClass('display-none');
		$('#liquidation-register-customer-name').addClass('display-none');
		$('#liquidation-send-received-good').addClass('display-none');
		$('#liquidation-send-good').addClass('display-none');
		
	}
}

function finishLiquidationProcessing2(){

	
	var idDis = $('#liquidation-cus-sel').val();
	
	if(idDis == -1){
		alert('Bạn chưa chọn nhà phân phối!');
		return;
	}
	
	$('#liquidation-register-btn2').prop('disabled', true);
	UIkit.modal("#waiting-modal").show();
	
	var inventoryItemPriceHistoryLst = $('#inventory_item_price_history_lst').val();
	var  inventoryItemPriceHistory = inventoryItemPriceHistoryLst.split(',');
	
	var param = '';
	var param2 = '';
	for(var i = 0; i < inventoryItemPriceHistory.length; i++){
		if(i != 0) {
			param = param + '&';
			param2 = param2 + '&';
		}
		param = param + 'inventoryItemPriceHistory='+inventoryItemPriceHistory[i];
		var num = $('#inventory-item-num-'+inventoryItemPriceHistory[i]).val();
		param = param + '&inventoryItemPriceHistoryNum='+((StringUtil.isEmpty(num) || num == undefined)?0:num);
		
		param2 = param2 + 'inventoryItemPriceHistory2='+inventoryItemPriceHistory[i];
		var num2 = $('#inventory-item-num2-'+inventoryItemPriceHistory[i]).val();
		param2 = param2 + '&inventoryItemPriceHistoryNum2='+((StringUtil.isEmpty(num2) || num2 == undefined)?0:num2);
	}
	
	setTimeout(function(){
		
		$.ajax({
			url: WEB_V1_SUSPENDED_DIS,
			method : POST,
			data: 'idCustomerS=' + idDis + '&' + param + '&' + param2,
			success: result => {
				$('#liquidation-register-btn2').prop('disabled', true);
				processData(result);
				UIkit.modal("#waiting-modal").hide();
				
			},
			error: error => {
				$('#liquidation-register-btn2').prop('disabled', true);
				UIkit.modal("#waiting-modal").hide();
				notify('Hệ thống lỗi, vui lòng thử lại sau...', DANGER);
			}
		});
		
	}, 1500);
}


function createNewDisLiquidationProcess(){


	
	var idDis = $('#create-new-dis-liquid-process-cus-sel').val();
	var nameCustomerNew = $('#create-new-dis-liquid-process-new-name').val();
	var mailLogin = $('#create-new-dis-liquid-process-new-acc').val();
	
	if(idDis == -1){
		alert('Bạn chưa chọn nhà phân phối!');
		return;
	}
	
	$('#create-new-dis-liquid-process-btn').prop('disabled', true);
	
	UIkit.modal("#waiting-modal").show();
	
	setTimeout(function(){
		
		$.ajax({
			url: WEB_V1_ADD_NEW_DISTRIBUTOR_LIQUIDATION_PROCESS,
			method : POST,
			data: 'idCustomerS=' + idDis + '&nameCustomerNew=' + nameCustomerNew + '&mailLogin=' + mailLogin,
			success: result => {
				
				processData(result);
				UIkit.modal("#waiting-modal").hide();
				
			},
			error: error => {
				
				UIkit.modal("#waiting-modal").hide();
				notify('Hệ thống lỗi, vui lòng thử lại sau...', DANGER);
			}
		});
		
	}, 1500);
}

function showFinishLiquidation(){

	var idDis = $('#finish-liquidation-cus-sel').val();
	
	if(idDis == -1){
		alert('Bạn chưa chọn nhà phân phối!');
		return;
	}
	
	UIkit.modal("#waiting-modal").show();
	
	
	setTimeout(function(){
		
		$.ajax({
			url: WEB_V1_SHOW_FINISH_LIQUIDATION,
			method : POST,
			data: 'idCustomerS=' + idDis,
			success: result => {
				
				processDataShowFinishLiquidation(result);
				UIkit.modal("#waiting-modal").hide();
				
			},
			error: error => {
				
				UIkit.modal("#waiting-modal").hide();
				notify('Hệ thống lỗi, vui lòng thử lại sau...', DANGER);
			}
		});
		
	}, 1500);
}

function processDataShowFinishLiquidation(result){
	var dataLst = result.data;
	var q = 0;
	for(q = 0;q < dataLst.length;q++){
		var data = dataLst[q];
		var actionKey = data.actionKey;
		var actionValue = data.actionValue;
		var id = data.idElement;
	
		if(actionKey == 'resData'){
			
			
			var name_customer_need_liquidation = actionValue[0];
			var name_customer_received_good = actionValue[1];
			var name_customer_received_good2 = actionValue[2];
			var id_inventory_item_lst = actionValue[3];
			var inventory_item_lst = actionValue[4];
			var id_price_history_lst = actionValue[5];
	
			
			
			
			$('#finish-liquidation-register-customer-name').removeClass('display-none');
			$('.finish-liquidation-send-received-good').removeClass('display-none');
			$('.finish-liquidation-send-good').removeClass('display-none');
			$('#finish-liquidation').removeClass('display-none');
			
			
			$('#finish-liquidation-register-customer-name-send').html(name_customer_need_liquidation);
			$('.finish-liquidation-send-good-text').html(name_customer_need_liquidation);
			$('#finish-liquidation-received-good-text').html(name_customer_received_good);
			$('#finish-liquidation-received-good-text2').html(name_customer_received_good2);
			
			
			
			$('#finish-liquidation-send-good-body').append('<input id="inventory_item_price_history_lst" type="hidden" value="'+id_inventory_item_lst+'" />');
			$('#finish-liquidation-send-good-body2').append('<input id="inventory_item_price_history_lst" type="hidden" value="'+id_inventory_item_lst+'" />');
			
			var row = null;
			var row1 = null;
			var inventoryNum1 = 'inventory-item-num-';
			var inventoryNum2 = 'inventory-item-num2-';
			for(var i = 0; i < inventory_item_lst.length; i++){
				
				
				for(var j = 0; j < inventory_item_lst[i].price_lst.length; j++){
					row = 	'<tr>'+
								'<td>'+
									inventory_item_lst[i].name_inventory_item + (id_price_history_lst.includes(inventory_item_lst[i].price_lst[j].id_price)?" (hàng giá cũ)":"") +
								'</td>'+
								'<td>'+
									inventory_item_lst[i].price_lst[j].price;
					row = row +		'</td>'+
								'<td><input id="{0}'+inventory_item_lst[i].id_inventory_item+'_'+inventory_item_lst[i].price_lst[j].id_price+'" type="number" /></td>'+
							'</tr>';
					
					row1 = row.repeat(1);
					
					row = row.replace('{0}', inventoryNum1);
					
					$('#finish-liquidation-send-good-body').append(row);
					
					row1 = row1.replace('{0}', inventoryNum2);
					$('#finish-liquidation-send-good-body2').append(row1);
				}
				
			}
			
			
			
			
		} else {
			processDataCommon(actionKey, actionValue, id);
		}
	}
}

function dequy(i, n, doc){
	var name = $('#order-detail-modal-head').text()+'.pdf';
	if(i > 0) doc.addPage();
	 doc.internal.pageSize.setWidth(794);
	 doc.internal.pageSize.setHeight(1123);
	 doc.addHTML(document.getElementById('page'+i+'-pdf'),{ compression:'NONE' },function() {
	     		
	     		if(i == n - 1){
	  		    	doc.save(name);
	     		} else {
				 	dequy(i + 1, n, doc);
	     		}	  		   
	  	    });
}

var DOCSO=function(){var t=["không","một","hai","ba","bốn","năm","sáu","bảy","tám","chín"],r=function(r,n){var o="",a=Math.floor(r/10),e=r%10;return a>1?(o=" "+t[a]+" mươi",1==e&&(o+=" mốt")):1==a?(o=" mười",1==e&&(o+=" một")):n&&e>0&&(o=" lẻ"),5==e&&a>=1?o+=" lăm":4==e&&a>=1?o+=" tư":(e>1||1==e&&0==a)&&(o+=" "+t[e]),o},n=function(n,o){var a="",e=Math.floor(n/100),n=n%100;return o||e>0?(a=" "+t[e]+" trăm",a+=r(n,!0)):a=r(n,!1),a},o=function(t,r){var o="",a=Math.floor(t/1e6),t=t%1e6;a>0&&(o=n(a,r)+" triệu",r=!0);var e=Math.floor(t/1e3),t=t%1e3;return e>0&&(o+=n(e,r)+" ngàn",r=!0),t>0&&(o+=n(t,r)),o};return{doc:function(r){if(0==r)return t[0];var n="",a="";do ty=r%1e9,r=Math.floor(r/1e9),n=r>0?o(ty,!0)+a+n:o(ty,!1)+a+n,a=" tỷ";while(r>0);return n.trim()}}}();



function viewSellin(){
	
	var idCustomerS = $('#view-sellin-cus-sel').val();
	
	if(StringUtil.isEmpty(idCustomerS) || idCustomerS == -1){
		UIkit.modal("#waiting-modal").hide();
		notify('Chưa chọn nhà phân phối!', DANGER);
		return;
	}
	
	var from = $('#view-sell-in-date-picker-from').val();
	var to = $('#view-sell-in-date-picker-to').val();
	
	if(StringUtil.isEmpty(from)){
		UIkit.modal("#waiting-modal").hide();
		notify('Ngày bắt đầu chưa được chọn!', DANGER);
		return;
	}
	
	if(StringUtil.isEmpty(to)){
		UIkit.modal("#waiting-modal").hide();
		notify('Ngày kết thúc chưa được chọn!', DANGER);
		return;
	}
	
	
	
		
	//$('#view-sell-in-btn').prop('disabled', true);
	
	var dataStr = 'idCustomerS=' + idCustomerS + '&from=' + from + '&to=' + to;
	
	UIkit.modal("#waiting-modal").show();
	
	$.ajax({
		url: WEB_V1_VIEW_SELL_IN,
		method : POST,
		data : dataStr,
		success: result => {
			processDataViewSellin(result);
			setInterval(function(){UIkit.modal("#waiting-modal").hide();}, 1000);
		},
		error: error => {
			setInterval(function(){UIkit.modal("#waiting-modal").hide();
				notify('Hệ thống lỗi, vui lòng thử lại sau...', DANGER);
			}, 1000);
		}
	});
		
	
	
	
}


function processDataViewSellin(result){
	var dataLst = result.data;
	var q = 0;
	for(q = 0;q < dataLst.length;q++){
		var data = dataLst[q];
		var actionKey = data.actionKey;
		var actionValue = data.actionValue;
		var id = data.idElement;
	
		if(actionKey == 'resData'){
			
			
			var sumOrders = actionValue[0];
			var resViewSellInWebLst = actionValue[1];
			
			$('#view-sell-in-order-table').remove();
			
	
			var orderLst = '<div id="view-sell-in-order-table" class="table-container uk-margin-top">'+
					            '<div class="table-container-header uk-padding-small margin-left-none uk-grid view-sell-in-total-sell-in" uk-grid="">'+
						            '<div class="padding-left-none uk-first-column">'+
						                '<span><span uk-icon="icon: cart" class="uk-margin-small-right uk-icon"></span>Đơn hàng</span>'+
						            '</div>'+
						            '<div class=" ">'+
						                '<b>Tổng sell in:&nbsp;</b> <span>'+formatCurrency(sumOrders)+'</span>'+
						
						            '</div>'+
						        '</div>'+
						        '<div class="uk-overflow-auto">'+
						            '<table class="uk-table uk-table-small uk-table-divider uk-table-striped uk-table-hover">'+
						                '<thead>'+
						                    '<tr>'+
						                        '<th><span class="uk-margin-small-right uk-icon" uk-icon="icon: list"></span>MÃ</th>'+
						                        '<th><span class="uk-margin-small-right uk-icon" uk-icon="icon: triangle-right"></span>LOẠI</th>'+
						                        '<th><span class="uk-margin-small-right uk-icon" uk-icon="icon: triangle-right"></span>TRẠNG&nbsp;THÁI</th>'+
												'<th><span class="uk-margin-small-right uk-icon" uk-icon="icon: triangle-right"></span>NGÀY&nbsp;ĐẶT&nbsp;HÀNG</th>'+
												'<th><span class="uk-margin-small-right uk-icon" uk-icon="icon: triangle-right"></span>NGÀY&nbsp;CHẤP&nbsp;NHẬN</th>'+
						                        '<th><span class="uk-margin-small-right uk-icon" uk-icon="icon: triangle-right"></span>NGÀY&nbsp;HOÀN&nbsp;THÀNH</th>'+
						                        '<th><span class="uk-margin-small-right uk-icon" uk-icon="icon: triangle-right"></span>THÀNH TIỀN</th>'+
						
						                    '</tr>'+
						                '</thead>'+
						                '<tbody id="view-sell-in-order-table-body">'+
						                    
						                
						                
						                '</tbody>'+
						            '</table>'+
						        '</div>'+
						    '</div>';
			
			
			$('#view-sell-in-container').append(orderLst);
			
			var row = '';
			for(var i = 0; i < resViewSellInWebLst.length; i++){
				row = 	'<tr>'+
			                '<td>'+resViewSellInWebLst[i].code_order+'</td>'+
			                '<td>'+resViewSellInWebLst[i].order_type_name+'</td>'+
			                '<td><span class="uk-label uk-label-success">'+resViewSellInWebLst[i].name_order_status+'</span></td>'+
			                '<td>'+resViewSellInWebLst[i].order_time+'</td>'+
			                '<td>'+resViewSellInWebLst[i].approve_order_time+'</td>'+
			                '<td>'+resViewSellInWebLst[i].finish_order_time+'</td>'+
			                '<td>'+formatCurrency(resViewSellInWebLst[i].sum_order)+'</td>'+
			                
			            '</tr>';
				
				$('#view-sell-in-order-table-body').append(row);
				
				
			}
			
			
			
			
		} else {
			processDataCommon(actionKey, actionValue, id);
		}
	}
}



function orderSum(id) {
	$('#order-sum' + id).removeClass("font-red-sharp");
	var inventoryNum = $('#inventory-num').val();
	var price = $('#order-price' + (id))[0].attributes["realNum"].value;
	var num = $('#inventory' + (id-1)).val();
	var orderTotal = 0;

	if (num == "") { num = 0; }

	var sum = price * num;
	var DSum = formatCurrency(sum);
	$('#order-sum' + id).text(DSum);

	if (num >= 0 && parseInt(num) == num) {
		$('#order-sum' + id).attr({
			"realNum": sum
		});
	} else {
		$('#order-sum' + id).attr({
			"realNum": 0
		});
		$('#order-sum' + id).text("Số không đúng");
		$('#order-sum' + id).addClass("font-red-sharp");
	}

	for (var i = 1; i <= inventoryNum; i++) {
		var s = $('#order-sum' + i)[0].attributes["realNum"].value;


		orderTotal = orderTotal + parseInt(s);
	}

	$('#order-sum-price').text(formatCurrency(orderTotal));
	$('#order-sum-price').attr({
		"realNum": orderTotal
	});
}








