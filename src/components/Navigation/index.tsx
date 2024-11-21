"use client";
import Image from "next/image";
import { Button, ButtonLink } from "@/components/ui/buttons";
import Cookies from "js-cookie";
import { useRouter } from "next/navigation";
import styles from "./Navigation.module.css";

export function Navigation() {
    const router = useRouter();

    const logoutHandle = () => {
        Cookies.remove('token', { path: '/' });
        setTimeout(() => {
            router.push('/');
        }, 100);
    }

    return (
        <nav className={styles.navigation}>
            <div className="container">
                <section className={styles.navigationContentWrapper}>
                    <div className={styles.wrapperLogo}>
                        <Image src="/logo.svg" alt="logo" width={80} height={32} />
                    </div>
                    <input type="search" placeholder="Поиск" />
                    {/* {!Cookies.get('token') ? (
                        <ButtonLink text='Войти' href="/" />
                    ) : (
                        <Button text="Выйти" click={logoutHandle} />
                    )} */}
                    <ButtonLink text='Войти' href="/" />
                    <Button text="Выйти" click={logoutHandle} />
                </section>
            </div>
        </nav>
    );
}
