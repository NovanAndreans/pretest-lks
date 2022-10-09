import React, { useEffect, useState, createRef } from 'react';
import { BrowserRouter as Router, Routes, Route, Link, NavLink, useNavigate } from "react-router-dom";
import axios from 'axios'
import Swal from 'sweetalert2';
import Form from 'react-bootstrap/Form'
import Button from 'react-bootstrap/Button'
import Session from 'react-session-api'

export default function LandingPage() {
    const [allMenu, setAllMenu] = useState([]);
    const [allCategory, setAllCategory] = useState([]);
    const [tags, setTags] = useState([]);
    const [chosedTags, setChosedTags] = useState([]);

    const [menuId, setMenuId] = useState('');
    const [menuName, setMenuName] = useState('');
    const [tagId, setTagId] = useState('');
    const [tagName, setTagName] = useState('');
    const [tagType, setTagType] = useState('');

    const [newTag, setNewTag] = useState('');
    const [typeTagActive, setTypeTagActive] = useState('');

    const [comment, setComment] = useState('');
    const [value, setValue] = useState('');

    const scrollDiv = createRef();

    const scrollSmoothHandler = () => {
        scrollDiv.current.scrollIntoView({ behavior: "smooth" });
    };

    useEffect(() => {
        axios.get(`/api/menus/all`)
            .then(function (response) {
                setAllMenu(response.data)
            })
            .catch(function (error) {
                Swal.fire({
                    icon: 'error',
                    title: 'An Error Occured!',
                    showConfirmButton: false,
                    timer: 1500
                })
            })

    }, [])

    useEffect(() => {
        axios.get(`/api/categorys/all`)
            .then(function (response) {
                setAllCategory(response.data)
            })
            .catch(function (error) {
                Swal.fire({
                    icon: 'error',
                    title: 'An Error Occured!',
                    showConfirmButton: false,
                    timer: 1500
                })
            })

    }, [])

    const filterCategory = async (e) => {

        const formData = new FormData()

        formData.append('idCategory', e)

        var response = await axios.post(`http://localhost:8000/api/menus/where`, formData)
        console.log(response)
        setAllMenu(response.data)
    }

    const getAllMenu = async (e) => {
        axios.get(`/api/menus/all`)
            .then(function (response) {
                setAllMenu(response.data)
            })
            .catch(function (error) {
                Swal.fire({
                    icon: 'error',
                    title: 'An Error Occured!',
                    showConfirmButton: false,
                    timer: 1500
                })
            })
    }

    const createNewTag = async (e) => {
        e.preventDefault();

        const formData = new FormData()

        formData.append('tagname', newTag)
        formData.append('tagtype', typeTagActive)

        await axios.post(`http://localhost:8000/api/tags`, formData).then(({ data }) => {
            Swal.fire({
                icon: "success",
                text: name + ` Has Been Created`
            })
            setNewTag('')
            fetch(typeTagActive)
        }).catch(({ response }) => {
            if (response.status === 422) {
                setValidationError(response.data.errors)
            } else {
                Swal.fire({
                    text: response.data.message,
                    icon: "error"
                })
            }
        })
    }

    var fetch = async (type) => {

        const formData = new FormData()

        formData.append('type', type)

        var response = await axios.post(`http://localhost:8000/api/tags/where`, formData)
        if (response.data['message'] == 'success') {
            console.log(response.data)
            setTags(response.data['data'])
        }
    }

    const send = async (e) => {
        e.preventDefault();

        const formData = new FormData()

        formData.append('idMenu', menuId)
        formData.append('idUser', Session.get('id'))
        formData.append('comment', comment)
        formData.append('value', value)
        formData.append('tag', JSON.stringify(chosedTags))

        const config = {
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json',
            }
        }

        await axios.post(`http://localhost:8000/api/comments`, formData, config).then(({ data }) => {
            Swal.fire({
                icon: "success",
                text: `Your Comment Has Been Send`
            })

        }).catch(({ response }) => {
            if (response.status === 422) {
                setValidationError(response.data.errors)
            } else {
                Swal.fire({
                    text: response.data.message,
                    icon: "error"
                })
            }
        })
    }

    return (
        <div>
            <div id="topbar" className="d-flex align-items-center fixed-top">
                <div className="container d-flex justify-content-center justify-content-md-between">

                    <div className="contact-info d-flex align-items-center">
                        <i className="bi bi-phone d-flex align-items-center"><span>+1 5589 55488 55</span></i>
                        <i className="bi bi-clock d-flex align-items-center ms-4"><span> Mon-Sat: 11AM - 23PM</span></i>
                    </div>

                    <div className="languages d-none d-md-flex align-items-center">
                        <ul>
                            <li>En</li>
                            <li><a href="#">De</a></li>
                        </ul>
                    </div>
                </div>
            </div>

            <header id="header" className="fixed-top d-flex align-items-cente">
                <div className="container-fluid container-xl d-flex align-items-center justify-content-lg-between">

                    <h1 className="logo me-auto me-lg-0"><a href="index.html">Restaurantly</a></h1>

                    <nav id="navbar" className="navbar order-last order-lg-0">
                        <ul>
                            <li><Link to={'/dashboard'}>Is Admin</Link></li>
                            <li><a className="nav-link scrollto active" href="#hero">Home</a></li>
                            <li><a className="nav-link scrollto" href="#menu">Menu</a></li>
                            <li><a className="nav-link scrollto" href="#chefs">Rate</a></li>
                            <li><a className="nav-link scrollto" href="#contact">Comment</a></li>
                        </ul>
                        <i className="bi bi-list mobile-nav-toggle"></i>
                    </nav>
                    <a href="#book-a-table" className="book-a-table-btn scrollto d-none d-lg-flex">Book a table</a>

                </div>
            </header>

            <section ref={scrollDiv} id="hero" className="d-flex align-items-center">
                <div className="container position-relative text-center text-lg-start" data-aos="zoom-in" data-aos-delay="100">
                    <div className="row">
                        <div className="col-lg-8">
                            <h1>Welcome to <span>Restaurantly</span></h1>
                            <h2>Delivering great food for more than 18 years!</h2>

                            <div className="btns">
                                <a href="#menu" className="btn-menu animated fadeInUp scrollto">Our Menu</a>
                                <a href="#book-a-table" className="btn-book animated fadeInUp scrollto">Book a Table</a>
                            </div>
                        </div>
                        <div className="col-lg-4 d-flex align-items-center justify-content-center position-relative" data-aos="zoom-in" data-aos-delay="200">
                            <a href="https://www.youtube.com/watch?v=u6BOC7CDUTQ" className="glightbox play-btn"></a>
                        </div>

                    </div>
                </div>
            </section>

            <main id="main">

                <section id="menu" className="menu section-bg">
                    <div className="container" data-aos="fade-up">

                        <div className='row menu-container mb-3'>

                            <div className="col-lg-3 menu-item" onClick={
                                (event) => {
                                    getAllMenu()
                                }
                            }>
                                All
                            </div>
                            {
                                Object.entries(allCategory).map(([key, value]) => (

                                    <div key={key} className="col-lg-3 menu-item" onClick={
                                        (event) => {
                                            filterCategory(value.idCategory)
                                        }
                                    }>
                                        {value.categoryname}
                                    </div>
                                ))
                            }
                        </div>

                        <div className="section-title">
                            <h2>Menu</h2>
                            <p>Check Our Tasty Menu</p>
                        </div>

                        <div className="row" data-aos="fade-up" data-aos-delay="200">

                            {
                                Object.entries(allMenu).map(([key, value]) => (

                                    <div className="col-lg-6 menu-item" onClick={
                                        (event) => {
                                            setMenuId(value.idMenu)
                                            setMenuName(value.menuname)
                                            console.log(menuName)
                                        }
                                    }>
                                        <a key={key} href="#chefs">
                                            <img src="assets/img/menu/lobster-bisque.jpg" className="menu-img" alt="" />
                                            <div className="menu-content">
                                                <a href="#">{value.menuname}</a><span>{value.price}</span>
                                            </div>
                                            <div className="menu-ingredients">
                                                Lorem, deren, trataro, filede, nerada
                                            </div>
                                        </a>
                                    </div>
                                ))
                            }

                        </div>

                    </div>
                </section>



                <section id="chefs" className="chefs">
                    <div className="container" data-aos="fade-up">

                        <div className="section-title">
                            <h2>Rate</h2>
                            {/* <p>Our Proffesional Chefs</p> */}
                        </div>

                        <div className="row">
                            <div className="col-lg-4 col-md-6" onClick={
                                (event) => {
                                    fetch('worst')
                                    setTypeTagActive('worst')
                                    setValue('-1')
                                }
                            }>
                                <a href="#testimonials">
                                    <div className="member" data-aos="zoom-in" data-aos-delay="100">
                                        <img src="assets/img/chefs/bad.png" className="img-fluid" alt="" />
                                        <div className="member-info">
                                            <div className="member-info-content">
                                                <h4>Worst</h4>
                                            </div>
                                        </div>
                                    </div>
                                </a>
                            </div>

                            <div className="col-lg-4 col-md-6" onClick={
                                (event) => {
                                    fetch('normal')
                                    setTypeTagActive('normal')
                                    setValue('1')
                                }
                            }>
                                <a href="#testimonials">
                                    <div className="member" data-aos="zoom-in" data-aos-delay="200">
                                        <img src="assets/img/chefs/neutral.png" className="img-fluid" alt="" />
                                        <div className="member-info">
                                            <div className="member-info-content">
                                                <h4>Normal</h4>
                                            </div>
                                        </div>
                                    </div>
                                </a>
                            </div>


                            <div className="col-lg-4 col-md-6" onClick={
                                (event) => {
                                    fetch('best')
                                    setTypeTagActive('best')
                                    setValue('2')
                                }
                            }><a href="#testimonials">
                                    <div className="member" data-aos="zoom-in" data-aos-delay="300">
                                        <img src="assets/img/chefs/good.png" className="img-fluid" alt="" />
                                        <div className="member-info">
                                            <div className="member-info-content">
                                                <h4>Best</h4>
                                            </div>
                                        </div>
                                    </div>
                                </a>
                            </div>

                        </div>

                    </div>
                </section>

                <section id="testimonials" className="testimonials section-bg">
                    <div className="container menu-container" data-aos="fade-up">
                        {console.log(chosedTags)}
                        <div className='row'>
                            {
                                Object.entries(tags).map(([key, value]) => (


                                    // <a key={key} href="#chefs">
                                    <div key={key} className="col-lg-3 col-md-6 menu-item" onClick={
                                        (event) => {
                                            setChosedTags([...chosedTags, value])
                                        }
                                    }>
                                        <div>
                                            <h3>#{value.tagname}</h3>
                                        </div>
                                    </div>
                                    // </a>
                                ))
                            }
                        </div>
                        <div className='row'>
                            <div className="col-lg-12 col-md-12">
                                <h1>Choosed Tags</h1>
                            </div>
                            {
                                Object.entries(chosedTags).map(([key, value]) => (
                                    < div key={key} className="col-lg-3 col-md-6 menu-item" >
                                        <div>
                                            <h3>#{value.tagname}</h3>
                                        </div>
                                    </div>
                                ))
                            }
                        </div>
                        <div className='row col-lg-12 col-md-12 mt-3'>
                            <div className="col-lg-6 col-md-6">
                                <div>
                                    <Form onSubmit={createNewTag}>
                                        <Form.Control required placeholder="Type New Tag Here..." type="text" value={newTag} onChange={(event) => {
                                            setNewTag(event.target.value)
                                        }} />
                                        <Button variant="success" className="mt-2" size="md" block="block" type="submit">
                                            Save
                                        </Button>
                                    </Form>
                                </div>
                            </div>
                            <div className="col-lg-6 col-md-6">
                                <a href='#contact'>
                                    <Button variant="success" className="mt-2 justify-content-center" size="lg" block="block">
                                        Next
                                    </Button>
                                </a>
                            </div>
                        </div>

                    </div>
                </section >

                <section id="contact" className="contact">
                    <div className="container" data-aos="fade-up">

                        <div className="section-title">
                            <h2>Comment</h2>
                        </div>
                    </div>

                    {/* <div data-aos="fade-up">
                            <iframe style={border = "0", width = "100%", height = "350px"} src="https://www.google.com/maps/embed?pb=!1m14!1m8!1m3!1d12097.433213460943!2d-74.0062269!3d40.7101282!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0xb89d1fe6bc499443!2sDowntown+Conference+Center!5e0!3m2!1smk!2sbg!4v1539943755621" frameborder="0" allowfullscreen></iframe>
                        </div> */}

                    <div className="container" data-aos="fade-up">

                        <div className="row mt-5">

                            <div className="col-lg-12 mt-5 mt-lg-0">

                                <Form onSubmit={send}>
                                    <div className="form-group mt-3">
                                        <textarea className="form-control" name="message" value={comment} rows="8" placeholder="Message" required onChange={(event) => { setComment(event.target.value) }}></textarea>
                                    </div>
                                    <div className="text-center" onClick={scrollSmoothHandler}><button type="submit" className='btn-warning'>Send Message</button></div>
                                </Form>

                            </div>

                        </div>

                    </div>
                </section>

            </main >

            <footer id="footer">
                <div className="footer-top">
                    <div className="container">
                        <div className="row">
                            <div className="col-lg-3 col-md-6">
                                <div className="footer-info">
                                    <h3>Restaurantly</h3>
                                    <p>
                                        A108 Adam Street <br />
                                        NY 535022, USA<br /><br />
                                        <strong>Phone:</strong> +1 5589 55488 55<br />
                                        <strong>Email:</strong> info@example.com<br />
                                    </p>
                                    <div className="social-links mt-3">
                                        <a href="#" className="twitter"><i className="bx bxl-twitter"></i></a>
                                        <a href="#" className="facebook"><i className="bx bxl-facebook"></i></a>
                                        <a href="#" className="instagram"><i className="bx bxl-instagram"></i></a>
                                        <a href="#" className="google-plus"><i className="bx bxl-skype"></i></a>
                                        <a href="#" className="linkedin"><i className="bx bxl-linkedin"></i></a>
                                    </div>
                                </div>
                            </div>

                            <div className="col-lg-2 col-md-6 footer-links">
                                <h4>Useful Links</h4>
                                <ul>
                                    <li><i className="bx bx-chevron-right"></i> <a href="#">Home</a></li>
                                    <li><i className="bx bx-chevron-right"></i> <a href="#">About us</a></li>
                                    <li><i className="bx bx-chevron-right"></i> <a href="#">Services</a></li>
                                    <li><i className="bx bx-chevron-right"></i> <a href="#">Terms of service</a></li>
                                    <li><i className="bx bx-chevron-right"></i> <a href="#">Privacy policy</a></li>
                                </ul>
                            </div>

                            <div className="col-lg-3 col-md-6 footer-links">
                                <h4>Our Services</h4>
                                <ul>
                                    <li><i className="bx bx-chevron-right"></i> <a href="#">Web Design</a></li>
                                    <li><i className="bx bx-chevron-right"></i> <a href="#">Web Development</a></li>
                                    <li><i className="bx bx-chevron-right"></i> <a href="#">Product Management</a></li>
                                    <li><i className="bx bx-chevron-right"></i> <a href="#">Marketing</a></li>
                                    <li><i className="bx bx-chevron-right"></i> <a href="#">Graphic Design</a></li>
                                </ul>
                            </div>

                            <div className="col-lg-4 col-md-6 footer-newsletter">
                                <h4>Our Newsletter</h4>
                                <p>Tamen quem nulla quae legam multos aute sint culpa legam noster magna</p>
                                <form action="" method="post">
                                    <input type="email" name="email" /><input type="submit" value="Subscribe" />
                                </form>

                            </div>

                        </div>
                    </div>
                </div>

                <div className="container">
                    <div className="copyright">
                        &copy; Copyright <strong><span>Restaurantly</span></strong>. All Rights Reserved
                    </div>
                    <div className="credits">
                        Designed by <a href="https://bootstrapmade.com/">BootstrapMade</a>
                    </div>
                </div>
            </footer>
        </div >
    );
}