
## Installation & Setup

### Clone the Repository

Run the following commands in VS Code terminal or Android Studio:

```bash
git clone https://github.com/pallavik-pal/nexora.git
cd nexora
```

Run npm install inside both frontend and backend for node_modules installation:

```bash
cd frontend  

npm install  

cd ..  

cd backend  

npm install  
```
Create a file named .env inside the frontend folder and specify the following:  

```bash
mongouri = mongodb+srv://nexora:YhpCqLUOGOdO4UEu@cluster0.atq87my.mongodb.net/?appName=Cluster0
PORT = 5000

```
### RUN PROJECT 

inside frontend run below command 
```bash
npm run dev
```

Go to new terminal move to backend and run 
```bash
npm run dev 
```
now the link "localhost://------" will be shown in the terminal where the u ran frontend 

click it now the project opens in web browser which will look like

<img width="1877" height="902" alt="image" src="https://github.com/user-attachments/assets/5f3bf3a1-f547-4190-aee8-8c6b2fd5f80b" />

scroll down to look at products

click add to cart which navigates to /cart 

<img width="1907" height="915" alt="image" src="https://github.com/user-attachments/assets/692ceb00-bd0a-4687-9b01-b319bdae135b" />

now select the quantity of a product and proceed with checkout 

this allows you to move to a checkout page /checkout 

specify the shipping address and click save 

<img width="1875" height="914" alt="image" src="https://github.com/user-attachments/assets/a38bd206-08c2-434f-95e5-acc8aea826c4" />

The shipping items are shown below click proceed this navigates to a order confirmed page 

<img width="1872" height="924" alt="image" src="https://github.com/user-attachments/assets/b8fe53c6-4928-4e8c-8e06-dac9833764d5" />

click download Reciept to download a reciept


