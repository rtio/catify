import { useState, useEffect } from 'react';
import { fetchNextCat, createUpVote, createDownVote } from './api/cats';
import VoteButton from './components/voteButton';
import Head from 'next/head'

import { Inter } from '@next/font/google'
import styles from '@/styles/Home.module.css'
import CatImage from './components/catImage';

const inter = Inter({ subsets: ['latin'] })

function CatVote() {
  const [cat, setCat] = useState(null);
  const [disabled, setDisabled] = useState(false);

  useEffect(() => {
    fetchCat();
  }, []);

  const customStyles = {
    position: 'relative',
    width: '500px',
    height: '500px' 
  }

  const fetchCat = async () => {
    const nextCat = await fetchNextCat();
    setCat(nextCat);
  };

  const handleUpvote = async () => {
    setDisabled(true);
    const voteResult = await createUpVote(cat.id);
    console.log(`Upvoted cat with ID ${voteResult.image_id}`);
    fetchCat().then(() => setDisabled(false));
  };

  const handleDownvote = async () => {
    setDisabled(true);
    const voteResult = await createDownVote(cat.id);
    console.log(`Downvoted cat with ID ${voteResult.image_id}`);
    fetchCat().then(() => setDisabled(false));
  };

  return (
    <>
      <Head>
        <title>Catify</title>
        <meta name="description" content="Choose your prefered cat ❤️" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main className={styles.main}>
        <div className={styles.center} >
          <div className={styles.card} style={ disabled ? {filter: "grayscale(100%)"} : {} } >
            { cat ? <div><CatImage src={cat.url} /></div> : <div style={customStyles}></div> }
            <div className={styles.voteButtons} >
              <VoteButton vote="Like ❤️" color="#4CAF50" onClick={handleUpvote} disabled={disabled}/>
              <VoteButton vote="Dislike 🆇" color="#f44336" onClick={handleDownvote} disabled={disabled}/>
            </div>
          </div>
        </div>
      </main>
    </>
  );
}

export default CatVote;