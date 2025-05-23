<%--
  Created by IntelliJ IDEA.
  User: hello
  Date: 2019-12-3
  Time: 15:37
  To change this template use File | Settings | File Templates.
--%>
<%@ page contentType="text/html;charset=UTF-8" language="java" %>
<%@ taglib uri="http://java.sun.com/jsp/jstl/core" prefix="c" %>
<%@ page isELIgnored="false" %>

<!doctype html>
<html lang="en">
<head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1, shrink-to-fit=no">
    <meta name="description" content="">
    <meta name="author" content="">
    <meta name="generator" content="">
    <title>Dashboard Template · Bootstrap</title>

    <!-- Bootstrap core CSS -->
    <link href="<%=request.getContextPath()%>/static/bootstrap/css/bootstrap.css" rel="stylesheet">
    <script src="<%=request.getContextPath()%>/static/jquery/jquery-3.4.1.js"></script>
    <script src="<%=request.getContextPath()%>/static/bootstrap/js/bootstrap.bundle.min.js"></script>
    <!-- Custom styles for this template -->
    <link href="<%=request.getContextPath()%>/static/css/app.css" rel="stylesheet">
    <style>
        .bd-placeholder-img {
            font-size: 1.125rem;
            text-anchor: middle;
            -webkit-user-select: none;
            -moz-user-select: none;
            -ms-user-select: none;
            user-select: none;
        }

        @media (min-width: 768px) {
            .bd-placeholder-img-lg {
                font-size: 3.5rem;
            }
        }
    </style>
</head>
<body>
<jsp:include page="head.jsp" />

<div class="container-fluid">
    <div class="row">
        <jsp:include page="nav.jsp" >
            <jsp:param name="active" value="dosing_guideline" />
        </jsp:include>

        <main role="main" class="col-md-9 ml-sm-auto col-lg-10 px-4">
            <div class="d-flex justify-content-between flex-wrap flex-md-nowrap align-items-center pt-3 pb-2 mb-3 border-bottom">
                <h2>Dosing Guidelines</h2>
            </div>
            <div class="table-responsive">
                <select id="columnSelectDosing" class="custom-select" onchange="filterTable('dosingTable', 'searchInputDosing', 'columnSelectDosing')">
                    <option value="all">All columns</option>
                    <option value="0">#</option>
                    <option value="1">Name</option>
                    <option value="2">Recommendation</option>
                    <option value="3">Drug Id</option>
                    <option value="4">Source</option>
                    <option value="5">Summary Markdown</option>
                </select>
                <input type="text" id="searchInputDosing" class="form-control mb-3" placeholder="Search from table..." onkeyup="filterTable('dosingTable', 'searchInputDosing', 'columnSelectDosing')">
                <table class="table table-striped table-sm" id="dosingTable">
                    <thead>
                    <tr>
                        <th onclick="sortTable('dosingTable', 0)">#</th>
                        <th onclick="sortTable('dosingTable', 1)">Name</th>
                        <th onclick="sortTable('dosingTable', 2)">Recommendation</th>
                        <th onclick="sortTable('dosingTable', 3)">Drug Id</th>
                        <th onclick="sortTable('dosingTable', 4)">Source</th>
                        <th onclick="sortTable('dosingTable', 5)">Summary Markdown</th>
                    </tr>
                    </thead>
                    <tbody>
                    <c:forEach items="${dosingGuidelines}" var="item">
                        <tr>
                            <td>${item.id}</td>
                            <td>${item.name}</td>
                            <td>${item.recommendation}</td>
                            <td>${item.drugId}</td>
                            <td>${item.source}</td>
                            <td>${item.summaryMarkdown}</td>
                        </tr>
                    </c:forEach>

                    </tbody>
                </table>
                <script>
                    var workerPath = '<%=request.getContextPath()%>/static/js/sortWorker.js';
                </script>
                <script src="<%=request.getContextPath()%>/static/js/tableUtils.js"></script>
            </div>
        </main>
    </div>
</div>
</body>
</html>
