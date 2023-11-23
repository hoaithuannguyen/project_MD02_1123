import React from 'react'
// import './Footer.scss'
import 'mdb-react-ui-kit/dist/css/mdb.min.css';
import "@fortawesome/fontawesome-free/css/all.min.css";
import { MDBFooter, MDBContainer, MDBRow, MDBCol, MDBIcon } from 'mdb-react-ui-kit';

export default function Footer() {
    return (
        <MDBFooter style={{ backgroundColor: "rgb(56, 179, 138)" }} className='text-center text-lg-start text-muted'>
            <section className='d-flex justify-content-center justify-content-lg-between p-4 border-bottom  text-white'>
                <div className='me-5 d-none d-lg-block text-white'>
                    <h4 style={{ fontWeight: "bold" }}>Kết nối với IKids-Clothing:</h4>
                </div>

                <div>
                    <a href='' className='me-4 text-reset '>
                        <MDBIcon fab icon="facebook-f " />
                    </a>
                    <a href='' className='me-4 text-reset'>
                        <MDBIcon fab icon="twitter" />
                    </a>
                    <a href='' className='me-4 text-reset'>
                        <MDBIcon fab icon="google" />
                    </a>
                    <a href='' className='me-4 text-reset'>
                        <MDBIcon fab icon="instagram" />
                    </a>
                    <a href='' className='me-4 text-reset'>
                        <MDBIcon fab icon="linkedin" />
                    </a>
                    <a href='' className='me-4 text-reset'>
                        <MDBIcon fab icon="github" />
                    </a>
                </div>
            </section>

            <section className=''>
                <MDBContainer className='text-center text-md-start mt-5  text-white'>
                    <MDBRow className='mt-3'>
                        <MDBCol md="3" lg="4" xl="3" className='mx-auto mb-4'>
                            <h6 className='text-uppercase fw-bold mb-4'>
                                <MDBIcon icon="gem" className="me-3" />
                                IKids-Clothing
                            </h6>
                            <p>
                                "Yêu thương nhỏ bé, quần áo đẹp mắt.
                            </p>
                            <p>
                                Chất liệu an toàn, thiết kế tiện lợi, làm cho bé trở thành ngôi sao sáng trong thế giới nhỏ của mình."

                            </p>
                        </MDBCol>

                        <MDBCol md="2" lg="2" xl="2" className='mx-auto mb-4'>
                            <h6 className='text-uppercase fw-bold mb-4'>Sản phẩm</h6>
                            <p>
                                <a href='#!' className='text-reset'>
                                    Dành cho bé trai
                                </a>
                            </p>
                            <p>
                                <a href='#!' className='text-reset'>
                                    Dành cho bé gái
                                </a>
                            </p>
                            <p>
                                <a href='#!' className='text-reset'>
                                    Phụ kiện
                                </a>
                            </p>
                            <p>
                                <a href='#!' className='text-reset'>
                                    Thông tin thêm
                                </a>
                            </p>
                        </MDBCol>

                        <MDBCol md="3" lg="2" xl="2" className='mx-auto mb-4'>
                            <h6 className='text-uppercase fw-bold mb-4'>Phần tin tức</h6>
                            <p>
                                <a href='#!' className='text-reset'>
                                    Trang chủ
                                </a>
                            </p>
                            <p>
                                <a href='#!' className='text-reset'>
                                    Giới thiệu
                                </a>
                            </p>
                            <p>
                                <a href='#!' className='text-reset'>
                                    Sản phẩm
                                </a>
                            </p>
                            <p>
                                <a href='#!' className='text-reset'>
                                    Tin tức
                                </a>
                            </p>
                        </MDBCol>

                        <MDBCol md="4" lg="3" xl="3" className='mx-auto mb-md-0 mb-4'>
                            <h6 className='text-uppercase fw-bold mb-4'>Liên hệ</h6>
                            <p>
                                <MDBIcon icon="home" className="me-2" />
                                Tòa nhà Sông Đà, Hà Nội, VN
                            </p>
                            <p>
                                <MDBIcon icon="envelope" className="me-3" />
                                IKids-Clothing@gmail.com
                            </p>
                            <p>
                                <MDBIcon icon="phone" className="me-3" /> + 09 999 567 88
                            </p>
                            <p>
                                <MDBIcon icon="print" className="me-3" /> + 09 999 567 88
                            </p>
                        </MDBCol>
                    </MDBRow>
                </MDBContainer>
            </section>

            <div className='text-center p-4' style={{ backgroundColor: 'rgba(0, 0, 0, 0.05)', color: "white" }}>
                © 2023 Copyright:
                <a className='text-reset fw-bold' href='https://mdbootstrap.com/'>
                    IKids-Clothing
                </a>
            </div>
        </MDBFooter>
    );
}
