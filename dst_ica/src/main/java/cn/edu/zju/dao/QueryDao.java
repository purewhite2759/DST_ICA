package cn.edu.zju.dao;

import cn.edu.zju.bean.Query;
import cn.edu.zju.dbutils.DBUtils;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import java.sql.PreparedStatement;
import java.sql.ResultSet;
import java.sql.SQLException;
import java.util.ArrayList;
import java.util.List;

public class QueryDao extends BaseDao {

    private static final Logger log = LoggerFactory.getLogger(QueryDao.class);

    public List<Query> findDrugsWithoutBiomarker() {
        List<Query> queries = new ArrayList<>();
        DBUtils.execSQL(connection -> {
            try {
                PreparedStatement preparedStatement = connection.prepareStatement("select * from drug where biomarker = 0");
                ResultSet resultSet = preparedStatement.executeQuery();
                while (resultSet.next()) {
                    String id = resultSet.getString("id");
                    String name = resultSet.getString("name");
                    String objCls = resultSet.getString("obj_cls");
                    String drugUrl = resultSet.getString("drug_url");
                    Query query = new Query(id, name, objCls, drugUrl);
                    queries.add(query);
                }
            } catch (SQLException e) {
                log.info("", e);
            }
        });
        return queries;
    }
}
