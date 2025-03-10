//   const loadMoreRef = useRef(null);
//
// useEffect(() => {
//   const observer = new IntersectionObserver(
//     (entries) => {
//       if (entries[0].isIntersecting && !loading) {
//         debugger;
//         loadMore();
//       }
//     },
//     { rootMargin: '100px' }, // Trigger slightly before hitting the bottom
//   );

//   if (loadMoreRef.current) {
//     observer.observe(loadMoreRef.current);
//   }

//   return () => {
//     if (loadMoreRef.current) {
//       observer.unobserve(loadMoreRef.current);
//     }
//   };
// }, [loading]);
// const loadMore = () => {
//   setPage((page) => page + 1);
// };

<div className="container tile-list">
  {/* <div ref={loadMoreRef} style={{ height: '10px' }}></div> */}
  {/* {visibleCount < suggested.length && ( */}
  {/* <button className="secondary-button button-centered" onClick={loadMore}>
            Load More
          </button> */}
</div>;
{
  /* )} */
}
