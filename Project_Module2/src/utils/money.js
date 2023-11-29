// định dạng chuyển đổi tiền tệ
const changeVND = (price) =>{
    let VND = new Intl.NumberFormat('vi-VN', {
        style: 'currency',
        currency: 'VND',
    });
    return VND.format(price)
}
export {changeVND}
   
