exports.selectItemByKeyword = (connection, keyword) => {
  return new Promise((resolve, reject) => {
    const Query = `
    SELECT
      i.item_id, i.market_id, i.main_id, i.sub_id,
      m.market_name, i.item_unit, i.item_price, m.quick, m.delivery,
      S.user_id,
      IF(isnull(S.user_id), 0, IF(S.user_id = 1, 1, 0)) as favorite_flag
    FROM
      WP_ITEM i
    INNER JOIN
      WP_MARKET m ON i.market_id = m.market_id
    LEFT JOIN (
        SELECT
          user_id, item_id
        FROM
          WP_ITEM_FAVORITE wif
        WHERE wif.user_id = 1
      ) as S ON i.item_id = S.item_id
    WHERE
      i.item_name like '%${keyword}%'
    `
    connection.query(Query, (err, data) => {
      err && reject(err)
      resolve(data)
    })
  })
}