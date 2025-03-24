package cn.edu.zju.bean;

public class Query {

    private String id;
    private String name;
    private String drugUrl;
    private String ObjCls;

    public Query() {
    }

    public Query(String id, String name, String drugUrl, String objCls) {
        this.id = id;
        this.name = name;
        this.drugUrl = drugUrl;
        ObjCls = objCls;
    }

    public String getId() {
        return id;
    }

    public void setId(String id) {
        this.id = id;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public String getDrugUrl() {
        return drugUrl;
    }

    public void setDrugUrl(String drugUrl) {
        this.drugUrl = drugUrl;
    }

    public String getObjCls() {
        return ObjCls;
    }

    public void setObjCls(String objCls) {
        ObjCls = objCls;
    }

}