// 마켓의 앨범 가져오기
exports.getAlbum = (connection, data) => {
  return new Promise((resolve, reject) => {
    const Query = 'select * from WP_MARKET_ALBUM where market_id=?'
    connection.query(Query, [data.market_id], (err, result) => {
      err && reject(err)
      resolve(result)
    })
  })
}
