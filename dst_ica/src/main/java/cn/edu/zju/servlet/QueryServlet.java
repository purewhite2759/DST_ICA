package cn.edu.zju.servlet;

import cn.edu.zju.bean.Query;
import cn.edu.zju.dao.QueryDao;

import javax.servlet.ServletException;
import javax.servlet.annotation.WebServlet;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.IOException;
import java.util.List;

@WebServlet(name = "QueryServlet", urlPatterns = "/query")

public class QueryServlet extends HttpServlet{

    protected void doPost(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {

    }

    protected void doGet(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {

        QueryDao queryDao = new QueryDao();
        List<Query> all = queryDao.findDrugsWithoutBiomarker();

        request.setAttribute("queries", all);
        request.getRequestDispatcher("/views/query.jsp").forward(request, response);

    }
}
