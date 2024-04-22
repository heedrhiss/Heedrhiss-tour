import Footer from './Footer'
import Logo from './Logo'
import styles from './Sidebar.module.css'

function Sidebar() {
    return (
        <div className={styles.sidebar}>
            <Logo/>
            <div className={styles.ex}>
                <div>Cities</div>
                /
                <div>Countries</div>
            </div>
            <div>List of Cities</div>
            <Footer/>
        </div>
    )
}

export default Sidebar
