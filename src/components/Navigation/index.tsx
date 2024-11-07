"use client";
import Image from "next/image";
import { Button } from "@/components/ui/buttons";
import styles from "./Navigation.module.css";

export function Navigation() {
    return (
        <nav className={styles.navigation}>
            <div className="container">
                <section className={styles.navigationContentWrapper}>
                    <div className={styles.wrapperLogo}>
                        <Image src="/logo.svg" alt="logo" width={80} height={32} />
                    </div>
                    <input type="search" placeholder="Поиск" />
                    <Button text="Войти" />
                </section>
            </div>
        </nav>
    );
}
