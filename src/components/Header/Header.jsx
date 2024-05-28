import styles from './Header.module.css';
import pokeball from '../../assets/pokeball.png';
import pokedex  from '../../assets/pokedex.png'; 

export const Header = () => {
    return (
        <header className={styles.header}>
          <a href="/">
            <img src={pokeball} className={styles.icon} alt="Pokeball" />
            <img src={pokedex} className={styles.logo} alt="Pokedex" />
          </a>
        </header>
    );
};