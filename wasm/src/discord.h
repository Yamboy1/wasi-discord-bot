#ifndef DISCORD_H
#define DISCORD_H

#include <stdint.h>

struct interaction_response {
    uint8_t ephemeral;
    char* content;
};

struct interaction_response* interaction_response_init(uint8_t ephemeral, char* content);
void interaction_response_free(struct interaction_response* res);

#endif