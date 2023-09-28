import styles from "./loading.module.css";
export default function LoadingCircle() {
  return (
    <>
      <div className="flex w-full h-full justify-center items-center">
        <div className={styles.loadingRing}></div>
      </div>
    </>
  );
}
