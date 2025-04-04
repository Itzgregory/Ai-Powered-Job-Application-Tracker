import styles from "../GeneralStyles.module.css";

interface StatProps {
  title: string;
  count: number;
}

interface StatsProps {
  stats: StatProps[];
}

const CurrentStats = ({ stats }: StatsProps) => {
  return (
    <section className={styles.statsContainer}>
      {stats.map((stat, index) => (
        <div key={index} className={styles.statCard}>
          <h3 className={styles.statTitle}>{stat.title}</h3>
          <p className={styles.statCount}>{stat.count}</p>
        </div>
      ))}
    </section>
  );
};

export default CurrentStats;