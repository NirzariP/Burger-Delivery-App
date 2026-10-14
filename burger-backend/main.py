from fastapi import FastAPI, HTTPException
from fastapi.staticfiles import StaticFiles
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel

from datetime import datetime, timezone
import uuid
from passlib.context import CryptContext


app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:5173"],
    allow_methods=["*"],
    allow_headers=["*"],
)

app.mount("/images", StaticFiles(directory="images"), name="images")

pwd_context = CryptContext(schemes=["bcrypt"], deprecated="auto")

class User(BaseModel):
    id: str
    name: str
    email: str
    hashed_password: str

class Address(BaseModel):
    id: str
    user_id: str
    label: str
    street: str
    city: str
    zip: str

class MenuItem(BaseModel):
    id: int
    name: str
    price: float
    image: str
    menuCategory: str
    subCategory: str = None
    special: bool = False

class OrderItem(BaseModel):
    id: int
    name: str
    price: float
    quantity: int

class Order(BaseModel):
    id: str
    name: str
    address: str
    items: list[OrderItem]
    total: float
    placedAt: str

class SignupRequest(BaseModel):
    name: str
    email: str
    password: str

class LoginRequest(BaseModel):
    email: str
    password: str

orders = []
users = []
addresses = []

menu_items = [
    # Standalone Burgers
    MenuItem(id=1, name="Classic Cheeseburger", price=8.99, menuCategory="burgers", subCategory="beef", special=True, image="http://localhost:8000/images/ClassicCheeseBurger.jpg"),
    MenuItem(id=2, name="Bacon BBQ Burger", price=10.49, menuCategory="burgers", subCategory="beef", image="http://localhost:8000/images/BaconBBQBurger.jpg"),
    MenuItem(id=3, name="Veggie Burger", price=7.99, menuCategory="burgers", subCategory="veggie", special=True, image="http://localhost:8000/images/VeggieBurger.jpg"),
    MenuItem(id=4, name="Grilled Chicken Burger", price=9.49, menuCategory="burgers", subCategory="chicken", image="http://localhost:8000/images/GrilledChickenBurger.jpg"),
    MenuItem(id=5, name="Double Smash Burger", price=12.99, menuCategory="burgers", subCategory="beef", special=True, image="http://localhost:8000/images/DoubleSmashBurger.jpg"),
    MenuItem(id=6, name="Spicy Jalapeño Burger", price=10.99, menuCategory="burgers", subCategory="beef", image="http://localhost:8000/images/SpicyJalepenoBurger.jpg"),
    MenuItem(id=7, name="Mushroom Swiss Burger", price=11.49, menuCategory="burgers", subCategory="beef", image="http://localhost:8000/images/MushroomSwissBurger.jpg"),
    MenuItem(id=8, name="Black Bean Burger", price=8.49, menuCategory="burgers", subCategory="veggie", image="http://localhost:8000/images/BlackBeanBurger.jpg"),
    MenuItem(id=9, name="Crispy Chicken Ranch Burger", price=9.99, menuCategory="burgers", subCategory="chicken", image="http://localhost:8000/images/CrispyChickenRanchBurger.jpg"),
    MenuItem(id=10, name="Hawaiian BBQ Burger", price=11.99, menuCategory="burgers", subCategory="beef", image="http://localhost:8000/images/HawaiianBBQBurger.jpg"),
    MenuItem(id=11, name="Buffalo Chicken Burger", price=10.49, menuCategory="burgers", subCategory="chicken", image="http://localhost:8000/images/BuffaloChickenBurger.jpg"),
    MenuItem(id=12, name="Truffle Mushroom Burger", price=13.99, menuCategory="burgers", subCategory="beef", special=True, image="http://localhost:8000/images/TruffleMushroomBurger.jpg"),
    MenuItem(id=13, name="Falafel Burger", price=8.99, menuCategory="burgers", subCategory="veggie", image="http://localhost:8000/images/FalafelBurger.jpg"),
    MenuItem(id=15, name="BBQ Pulled Chicken Burger", price=11.49, menuCategory="burgers", subCategory="chicken", image="http://localhost:8000/images/BBQPulledChickenBurger.jpg"),
    MenuItem(id=16, name="Pepper Jack Jalapeño Burger", price=11.99, menuCategory="burgers", subCategory="beef", image="http://localhost:8000/images/PepperJackJalepenoBurger.jpg"),
    MenuItem(id=17, name="Cheese Bomb Burger", price=11.99, menuCategory="burgers", subCategory="veggie", image="http://localhost:8000/images/CheeseBombBurger.jpg"),

    # Combo Meals
    MenuItem(id=50, name="Classic Combo", price=12.99, menuCategory="meals", includes=["Classic Cheeseburger", "Classic Cheeseburger", "Fries"], special=True, image="http://localhost:8000/images/ClassicCombo.jpg"),
    MenuItem(id=51, name="Bacon BBQ Combo", price=14.49, menuCategory="meals", includes=["Bacon BBQ Burger", "Cola", "Fries"], image="http://localhost:8000/images/BaconBBQCombo.jpg"),

    # Desserts
    MenuItem(id=20, name="Chocolate Brownie", price=4.99, menuCategory="desserts", image="http://localhost:8000/images/ChocolateBrownie.jpg"),
    MenuItem(id=21, name="Vanilla Milkshake", price=5.49, menuCategory="desserts", image="http://localhost:8000/images/VanillaMilkshake.jpg"),

    # Beverages
    MenuItem(id=30, name="Classic Cola", price=2.49, menuCategory="beverages", image="http://localhost:8000/images/ClassicCola.jpg"),
    MenuItem(id=31, name="Fresh Lemonade", price=3.49, menuCategory="beverages", image="http://localhost:8000/images/Lemonade.jpg"),
    MenuItem(id=32, name="Sprite", price=2.49, menuCategory="beverages", image="http://localhost:8000/images/Sprite.jpg"),

    # Sides
    MenuItem(id=40, name="French Fries", price=3.99, menuCategory="sides", image="http://localhost:8000/images/FrenchFries.jpg"),
    MenuItem(id=41, name="Onion Rings", price=4.49, menuCategory="sides", image="http://localhost:8000/images/OnionRings.jpg"),
    MenuItem(id=42, name="Cheese Dip", price=1.5, menuCategory="sides", image="http://localhost:8000/images/CheeseDip.jpg"),
    MenuItem(id=43, name="Ranch Sauce", price=1.5, menuCategory="sides", image="http://localhost:8000/images/RanchSauce.jpg"),
]

@app.get("/burgers")
def get_burgers():
    return menu_items

@app.post("/orders")
def create_order(order: dict):
    new_order = Order(
        id=str(uuid.uuid4())[:8],
        name=order['name'],
        address=order['address'],
        items=order['items'],
        total=order['total'],
        placedAt=datetime.now(timezone.utc).isoformat(),
    )
    orders.append(new_order)
    return new_order

@app.post("/signup")
def signup(data: SignupRequest):
    existing = next((u for u in users if u.email == data.email), None)
    if existing:
        raise HTTPException(status_code=400, detail="Email already registered")

    new_user = User(
        id=str(uuid.uuid4())[:8],
        name=data.name,
        email=data.email,
        hashed_password=pwd_context.hash(data.password),
    )
    users.append(new_user)

    return {"token": new_user.id, "name": new_user.name, "email": new_user.email}


@app.post("/login")
def login(data: LoginRequest):
    user = next((u for u in users if u.email == data.email), None)
    if not user or not pwd_context.verify(data.password, user.hashed_password):
        raise HTTPException(status_code=401, detail="Invalid email or password")

    return {"token": user.id, "name": user.name, "email": user.email}