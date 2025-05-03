import React from "react";
import styles from "../../../GeneralStyles.module.css";
import IntrosProps from "../type/introType"


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
