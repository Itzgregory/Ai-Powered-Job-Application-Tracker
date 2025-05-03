export default interface IntrosProps {
    intros: {
      title: string;
      content: string;
      button?: { label: string; onClick: () => void };
      link?: { label: string; href: string };
      image?: { src: string; alt: string };
    }[];
  }