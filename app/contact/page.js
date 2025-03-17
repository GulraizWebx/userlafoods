
import Layout from "@/components/layout/Layout"
import Link from "next/link"
export default function Contact() {

    return (
        <>
            <Layout headerStyle={1} footerStyle={1}>
                <div>
                    <section className="contact-area pt-80 pb-80" style={{ backgroundImage: "url('/assets/img/banner/contactimg.jpg')", backgroundSize: "cover", backgroundPosition: "center" }}>
                        <div className="container">
                            <div className="row">
                                {/* <div className="col-lg-4 col-12">
                                    <div className="tpcontact__right mb-40">
                                        <div className="tpcontact__shop mb-30">
                                            <h4 className="tpshop__title mb-25">Get In Touch</h4>
                                            <div className="tpshop__info">
                                                <ul>
                                                    <li><i className="fal fa-map-marker-alt" /> <Link href="#">24/26 Strait Bargate, Boston, PE21,  United Kingdom</Link></li>
                                                    <li>
                                                        <i className="fal fa-phone" />
                                                        <Link href="/tel:0123456789">+098 (905) 786 897 8</Link>
                                                        <Link href="/tel:0123456789">6 - 146 - 389 - 5748</Link>
                                                    </li>
                                                    <li>
                                                        <i className="fal fa-clock" />
                                                        <span>Store Hours:</span>
                                                        <span>10 am - 10 pm EST, 7 days a week</span>
                                                    </li>
                                                </ul>
                                            </div>
                                        </div>
                                        <div className="tpcontact__support">
                                            <Link href="/tel:0123456">Get Support On Call <i className="fal fa-headphones" /></Link>
                                            <Link target="_blank" href="https://www.google.com/maps/@36.963672,-119.2249843,7.17z">Get Direction <i className="fal fa-map-marker-alt" /></Link>
                                        </div>
                                    </div>
                                </div> */}
                                <div className="col-lg-6 col-12">
                                <div className="tpcontact__right mb-40">
                                <div className="tpcontact__info mb-35">
                                            {/* <h4 className="tpcontact__title">Get in Touch With a Restaurant Supply Company</h4> */}
                                        </div>
                                        <div className="tpcontact__shop mb-30">
                                            <h4 className="tpshop__title mb-25">Get In Touch With a Restaurant Supply Company</h4>
                                            <div className="tpshop__info">
                                                <ul>
                                                    <li><i className="fa fa-envelope" /> <Link href="#">Order@LAFoodservice.com</Link></li>
                                                    <li>
                                                        <i className="fal fa-phone" />
                                                        <Link href="/tel:1(833) 523-6637">1-833-LA FOODS</Link>
                                                        <Link href="/tel:1(833) 523-6637">1(833) 523-6637</Link>
                                                    </li>
                                                    <li>
                                                        <i className="fal fa-clock" />
                                                        <span>Store Hours:</span>
                                                        <span>10 am - 10 pm EST, 7 days a week</span>
                                                    </li>
                                                </ul>
                                            </div>
                                        </div>
                                    </div>



                                    <div className="tpcontact__form">
                                        <div className="tpcontact__info mb-35">
                                            {/* <h4 className="tpcontact__title">Make Custom Request</h4>
                                            <p>Must-have pieces selected every month want style Ideas and Treats?</p> */}
                                        </div>
                                        <form action="#" id="contact-form" method="POST">
                                            <div className="row">
                                                <div className="col-lg-6">
                                                    <div className="tpcontact__input mb-20">
                                                        <input name="name" type="text" placeholder="Full name" required />
                                                    </div>
                                                </div>
                                                <div className="col-lg-6">
                                                    <div className="tpcontact__input mb-20">
                                                        <input name="email" type="email" placeholder="Email address" required />
                                                    </div>
                                                </div>
                                                <div className="col-lg-6">
                                                    <div className="tpcontact__input mb-20">
                                                        <input name="number" type="text" placeholder="Phone number" required />
                                                    </div>
                                                </div>
                                                <div className="col-lg-6">
                                                    <div className="tpcontact__input mb-20">
                                                        <input name="subject" type="text" placeholder="Subject" required />
                                                    </div>
                                                </div>
                                                <div className="col-lg-12">
                                                    <div className="tpcontact__input mb-30">
                                                        <textarea name="message" placeholder="Enter message" required />
                                                    </div>
                                                </div>
                                            </div>
                                            <div className="tpcontact__submit">
                                                <button className="tp-btn tp-color-btn tp-wish-cart">Submit <i className="fal fa-long-arrow-right" /></button>
                                            </div>
                                        </form>
                                        <p className="ajax-response mt-30" />
                                    </div>
                                </div>
                            </div>
                        </div>
                    </section>
                    
                </div>

            </Layout>
        </>
    )
}