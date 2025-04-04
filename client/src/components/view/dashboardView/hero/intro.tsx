import React from "react";
import styles from "../GeneralStyles.module.css";

interface IntroProps {
  title: string;
  content: number;
}

interface IntrosProps {
  intros: {
    title: string;
    content: string;
    button?: { label: string; onClick: () => void };
    link?: { label: string; href: string };
    image?: { src: string; alt: string };
  }[];
}

const IntroSection = ({intros}: IntrosProps) => {

  return (
    <section className={styles.statsContainer}>
      {intros.map((intro, index) => (
        <div key={index} className={styles.statCard}>
       <h3 className={styles.statTitle}>{intro.title}</h3>
          <p className={styles.statCount}>{intro.content}</p>
        </div>
      ))}
    </section>
  );
};

export default IntroSection;
