import { Chat, Notifications, Search } from '@mui/icons-material';

import styles from './Topbar.module.scss';
import person1 from '../../assets/person/1.jpeg';

function Topbar() {
  return (
    <div className={styles.container}>
      <div className={styles.left}>
        <span className={styles.logo}>MERN SNS</span>
      </div>
      <div className={styles.center}>
        <div className={styles.searchBar}>
          <Search className={styles.searchIcon} />
          <input type="text" className={styles.searchInput} placeholder="探しものは何ですか?" />
        </div>
      </div>
      <div className={styles.right}>
        <div className={styles.itemIcons}>
          <div className={styles.iconItem}>
            <Chat />
            <span className={styles.iconBadge}>1</span>
          </div>
          <div className={styles.iconItem}>
            <Notifications />
            <span className={styles.iconBadge}>2</span>
          </div>
        </div>
        <img className={styles.userIcon} src={person1} alt="" />
      </div>
    </div>
  );
}

export default Topbar;
