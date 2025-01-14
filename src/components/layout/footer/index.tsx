import styles from './Footer.module.css';

export function Footer() {
    return (
        <footer className={styles.footer}>
            <div className="container">
                <section className={styles.wrapperFooter}>
                    <p>Footer</p>
                </section>
            </div>
        </footer>
    );
}