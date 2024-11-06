import styles from './Footer.module.css';

export function Footer() {
    return (
        <footer>
            <div className="container">
                <section className={styles.wrapper__footer}>
                    <p>Footer</p>
                </section>
            </div>
        </footer>
    );
}