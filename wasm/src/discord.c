#include <stdlib.h>
#include <string.h>
#include "discord.h"

struct interaction_response* interaction_response_init(uint8_t ephemeral, char* content) {
    size_t length = strlen(content);
    char* contentMalloc = calloc(length+1, 1);
    strncpy(contentMalloc, content, length);
    struct interaction_response *res =
        malloc(sizeof(struct interaction_response));
    res->ephemeral = ephemeral;
    res->content = contentMalloc;

    return res;
}

void interaction_response_free(struct interaction_response* res) {
    free(res->content);
    free(res);
}