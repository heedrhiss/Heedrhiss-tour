import AppNav from './AppNav'
import Footer from './Footer'
import Logo from './Logo'
import styles from './Sidebar.module.css'

function Sidebar() {
    return (
        <div className={styles.sidebar}>
            <Logo/>
            <AppNav/>
            <div>List of Cities</div>
            <Footer/>
        </div>
    )
}

export default Sidebar
