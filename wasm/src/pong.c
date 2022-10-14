#include <stdbool.h>
#include "discord.h"

__attribute__((export_name("command")))
struct interaction_response* command() {
    return interaction_response_init(false, "Pong!");
};