package cn.edu.zju.servlet;

import javax.servlet.ServletException;
import javax.servlet.annotation.WebServlet;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.IOException;
import java.io.PrintWriter;
import java.sql.*;

@WebServlet(name = "QueryServlet", urlPatterns = "/query")

public class QueryServlet extends HttpServlet{

    protected void doPost(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {

    }

    protected void doGet(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {

        try {
            Class.forName("com.mysql.jdbc.Driver");
            Connection conn = DriverManager.getConnection("jdbc:mysql://localhost:3306/biomed?serverTimezone=UTC", "root", "Zaq1332759121");
            Statement stmt = conn.createStatement();
            ResultSet rs = stmt.executeQuery("SELECT * FROM drug WHERE biomarker = 0");
            PrintWriter out = response.getWriter();
            out.write("<html>");
            out.write("<body>");
            out.write("Drugs without biomarker: <br>");
            while (rs.next()) {
                out.write(rs.getString("id") + "&nbsp;&nbsp;&nbsp;&nbsp;");
                out.write(rs.getString("name") + "&nbsp;&nbsp;&nbsp;&nbsp;");
                out.write(rs.getString("obj_cls") + "&nbsp;&nbsp;&nbsp;&nbsp;");
                out.write(rs.getString("drug_url") + "&nbsp;&nbsp;&nbsp;&nbsp;");
                out.write("<br>");
            }
            out.write("</body>");
            out.write("</html>");
            stmt.close();
            conn.close();
        } catch (Exception e) {
            PrintWriter out = response.getWriter();
            out.write("<html>");
            out.write("<body>");
            out.write("Oh! I got an exception: <br>" + e.toString());
            out.write("</body>");
            out.write("</html>");
        }


    }
}
