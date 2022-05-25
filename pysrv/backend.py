from itertools import product
import re
import mysql.connector, json
from flask import Flask, request
from flask_cors import CORS

app = Flask(__name__)
CORS(app)

mydb = mysql.connector.connect(
  host="localhost",
  user="root",
  password="mySql"
)

@app.route("/")
def hello_world():
    return "<p>Hello, World!</p>"

@app.route("/getCustomer")
def getCustomers():
    cur = mydb.cursor()
    cur.execute("SELECT * FROM databaseweb.customer") 
    res = cur.fetchall()

    customerList = []
    for r in res:
        customerList.append({'id':r[0], 'name':r[1], 'PhoneNo':r[2]})

    return json.dumps(customerList)

@app.route("/getproducts")
def getProducts():
    cur = mydb.cursor()
    cur.execute("SELECT * FROM databaseweb.product") 
    res = cur.fetchall()
    productList = []
    for r in res:
        productList.append({'id':r[0], 'name':r[1], 'desc':r[2]})

    return json.dumps(productList)

@app.route('/getorder', methods=['GET','POST'])
def getOrder():
    if request.method == 'POST':
        oderId = request.json['oderId']

        cur = mydb.cursor()
        cur.execute("SELECT * FROM databaseweb.orderitem INNER JOIN databaseweb.product ON orderitem.productId=product.productId where orderId=%s", (oderId,) ) 
        res = cur.fetchall()
        list = []
        for r in res:
            list.append({'id':r[0], 'prodId':r[2], 'count':r[3], 'pName':r[5]})

        return json.dumps(list)
    return "something went wrong"


# add
@app.route('/newcustomer', methods=['GET','POST'])
def newcustomer():
    if request.method == 'POST':
        c_name = request.json['name']
        c_cellnum = request.json['cellnum']
        
        cur = mydb.cursor()
        sql = "INSERT INTO databaseweb.customer (Name, PhoneNo) VALUES (%s, %s)"
        val = (c_name, c_cellnum)
        cur.execute(sql, val)
        print("Inserted")
        mydb.commit()
        return "Customer added"
    return "Nothing has changed"

@app.route('/search', methods=['GET','POST'])
def search():
    if request.method != 'POST':
        return "Invalid"
    c_name = request.json['name']
    c_cellnum = request.json['cellnum']

    sql = ""
    val = None
    if c_name != "":
        sql = "SELECT * FROM databaseweb.customer WHERE Name=%s"
        val = (c_name,)
    if c_cellnum != "":
        sql = "SELECT * FROM databaseweb.customer WHERE PhoneNo=%s"
        val = (c_cellnum, )
    if c_name != "" and c_cellnum != "":
        sql = "SELECT * FROM databaseweb.customer WHERE Name=%s AND PhoneNo=%s"
        val = (c_name, c_cellnum)
        
    cur = mydb.cursor()
    cur.execute(sql, val) 
    custs = cur.fetchall()

    sql = "SELECT * FROM databaseweb.Order WHERE customerId=%s"
    orders = []
    for c in custs:
        cur.execute(sql, (c[0], ))
        orders.append(cur.fetchall())

    l = []
    for i in range(0, len(orders)):
        name = custs[i][1]
        num = custs[i][2]
        for o in orders[i]:
            l.append({'oid':o[0], 'cid':o[1], 'name':name, 'cellnum':num})
    return json.dumps(l)

@app.route('/productpage', methods=['GET','POST'])
def newOrder():
    if request.method == 'POST':
        c_name = request.json['name']
        c_description = request.json['desc']
        
        cur = mydb.cursor()
        sql = "INSERT INTO databaseweb.product (Name, Description) VALUES (%s, %s)"
        val = (c_name, c_description)
        cur.execute(sql, val)
        print("Inserted")
        mydb.commit()
        return "Product added"
    return "Something went wrong"


@app.route('/neworder', methods=['GET','POST'])
def newProduct():
    if request.method == 'POST':
        c_cusname = request.json['cusName']
        c_cuscell = request.json['cusCell']
        order = request.json['order']
        cusIdquery = "SELECT  idCustomer FROM databaseweb.customer WHERE Name=%s AND PhoneNo=%s"
        val = (c_cusname, c_cuscell)
    
        cur = mydb.cursor()
        cur.execute(cusIdquery, val)
        cusId = cur.fetchone()

        sql = "INSERT INTO databaseweb.order ( customerId) VALUES (%s)"
        cur.execute(sql,cusId)
        orderId = cur.lastrowid
        orderT =[]

        for i in order:
            orderT.append((orderId,i["id"],i["count"]))    
        
        sql = "INSERT INTO databaseweb.orderitem (orderId, productId, quantity) VALUES (%s,%s,%s)"
        cur.executemany(sql, orderT)
        mydb.commit()
        return "Product added"
    return "Something went wrong"