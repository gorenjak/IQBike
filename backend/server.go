package main

import (
	"log"
	"net/http"
	"os"

	"go-graphql-mongodb-api/database"
	"go-graphql-mongodb-api/graph"

	"github.com/99designs/gqlgen/graphql/handler"
	"github.com/99designs/gqlgen/graphql/playground"
	"github.com/rs/cors"
)

const defaultPort = "8080" // Privzeta številka vrat za strežnik
const mongoString = "mongodb+srv://admin:admin@cluster0.nikbntq.mongodb.net/?retryWrites=true&w=majority" // Povezovalni niz za MongoDB

func main() {
	database.Connect(mongoString) // Poveži se z MongoDB

	// Nastavitve CORS (Cross-Origin Resource Sharing)
	c := cors.New(cors.Options{
		AllowedOrigins:   []string{"*"}, // Dovoli vse izvorne naslove
		AllowCredentials: false,         // Ne dovoli kredencialov (piškotkov, avtentikacije, itd.)
	})

	port := os.Getenv("PORT") // Pridobi številko vrat iz okoljske spremenljivke
	if port == "" {
		port = defaultPort // Če ni nastavljena, uporabi privzeto številko vrat
	}

	srv := handler.NewDefaultServer(graph.NewExecutableSchema(graph.Config{Resolvers: &graph.Resolver{}})) // Ustvari nov GraphQL strežnik

	http.Handle("/", c.Handler(srv)) // Uporabi CORS in nastavi privzeto pot za strežnik
	http.Handle("/playground", playground.Handler("GraphQL playground", "/graphql")) // Nastavi pot za GraphQL playground

	log.Printf("OK -> server is running on port %s", port) // Zapiši v dnevnik, da strežnik deluje
	log.Fatal(http.ListenAndServe(":"+port, nil)) // Zaženi strežnik na določeni številki vrat
}