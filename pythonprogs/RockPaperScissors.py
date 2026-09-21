import random
computer_choice = random.choice(['rock', 'paper', 'scissors'])
while True:
    try:
            player_choice = input("Enter your choice (rock, paper, scissors): ")
            if player_choice not in ['rock', 'paper', 'scissors']:
                raise ValueError("Invalid choice. Please choose rock, paper, or scissors.")

            if player_choice == computer_choice:
                print(f"Both players selected {player_choice}. It's a tie!")
            elif player_choice == 'rock':
                if computer_choice == 'scissors':
                    print("Rock beats scissors! You win!")
                else:
                    print("Paper beats rock! You lose.")
            elif player_choice == 'paper':
                if computer_choice == 'rock':
                    print("Paper beats rock! You win!")
                else:
                    print("Scissors beats paper! You lose.")
            elif player_choice == 'scissors':
                if computer_choice == 'paper':
                    print("Scissors beats paper! You win!")
                else:
                    print("Rock beats scissors! You lose.")
            break
    except ValueError as e:
        print(e)