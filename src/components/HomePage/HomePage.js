import styles from "./HomePage.module.css"
import { Header } from "../Header/Header";
import { Footer } from "../Footer/Footer";

export const HomePage = () => {
    return (
        <div className="home">
            <Header></Header>
            <section>
                <div>
                    <div>
                        <h1>Welcome to Chatty</h1>
                        <p>A great place to share your thoughts with friends</p>
                    </div>
                </div>
            </section>
            <Footer></Footer>
        </div>
    );
}