import WhiteProduct from "@/components/sections/WhiteProduct";
import Link from "next/link";

const styles = {
    socialLinks: {
        display: "flex",
        gap: "15px",
        listStyle: "none",
        padding: 0,
    },
    listItem: {
        display: "inline-block",
    },
    link: {
        textDecoration: "none",
        color: "#333", // Set your preferred color
        fontSize: "16px",
        fontWeight: "bold",
    },
    icons: {
        color: "white",
        transition: "color 0.3s ease-in-out",
    },
};

export default function Footer1() {
    return (
        <footer>
            <div className="footer-area theme-bg ">
                <div className="footer-copyright footer-bg">
                    <div className="container">
                        <div className="row">
                            <div className="col-xl-6 col-lg-7 col-md-5 col-sm-12">
                                <div className="footer-copyright__content">
                                    <span>
                                        Copyright {new Date().getFullYear()}{" "}
                                        <Link href="/">©Lafoodservice</Link>. All rights reserved.
                                    </span>
                                </div>
                            </div>
                            <div className="col-xl-6 col-lg-5 col-md-7 col-sm-12">
                                <div className="footer-copyright__brand">
                                    <ul style={styles.socialLinks}>
                                        <li style={styles.listItem}>
                                            <a href="https://www.facebook.com/LAfoodservice/" style={styles.link}>
                                                <i
                                                    className="fab fa-facebook-f icons"
                                                    style={styles.icons}
                                                    onMouseEnter={(e) => (e.target.style.color = "#FBCC34")}
                                                    onMouseLeave={(e) => (e.target.style.color = "white")}
                                                />
                                            </a>
                                        </li>
                                        <li style={styles.listItem}>
                                            <a href="https://twitter.com/lafoodservice" style={styles.link}>
                                                <i
                                                    className="fab fa-twitter icons"
                                                    style={styles.icons}
                                                    onMouseEnter={(e) => (e.target.style.color = "#FBCC34")}
                                                    onMouseLeave={(e) => (e.target.style.color = "white")}
                                                />
                                            </a>
                                        </li>
                                        <li style={styles.listItem}>
                                            <a href="https://www.instagram.com/lafoodservice" style={styles.link}>
                                                <i
                                                    className="fab fa-instagram icons"
                                                    style={styles.icons}
                                                    onMouseEnter={(e) => (e.target.style.color = "#FBCC34")}
                                                    onMouseLeave={(e) => (e.target.style.color = "white")}
                                                />
                                            </a>
                                        </li>
                                        <li style={styles.listItem}>
                                            <a href="https://www.youtube.com/@lafoodservice" style={styles.link}>
                                                <i
                                                    className="fab fa-youtube icons"
                                                    style={styles.icons}
                                                    onMouseEnter={(e) => (e.target.style.color = "#FBCC34")}
                                                    onMouseLeave={(e) => (e.target.style.color = "white")}
                                                />
                                            </a>
                                        </li>
                                    </ul>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </footer>
    );
}
