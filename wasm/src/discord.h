#ifndef DISCORD_H
#define DISCORD_H

#include <stdbool.h>

struct interaction_response {
    bool ephemeral;
    char* content;
};

struct interaction_response* interaction_response_init(bool ephemeral, char* content);
void interaction_response_free(struct interaction_response* res);

#endif