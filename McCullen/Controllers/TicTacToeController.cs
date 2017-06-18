﻿using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using Newtonsoft.Json;
using System.IO;
using Microsoft.AspNetCore.Hosting;

// For more information on enabling Web API for empty projects, visit https://go.microsoft.com/fwlink/?LinkID=397860

namespace McCullen.Controllers
{
    [Route("api/[controller]")]
    public class TicTacToeController : Controller
    {
        private IHostingEnvironment hostingEnvironment_;
        public TicTacToeController(IHostingEnvironment hostingEnvironment)
        {
            hostingEnvironment_ = hostingEnvironment;
        }
        public class MoveValue
        {
            public int Row { get; set; }
            public int Column { get; set; }
            public int State { get; set; }
            public int Depth { get; set; }
        }
        private string GetSolutionPath(int rows, int columns)
        {
            string fileName = "solution-" + rows + "-by-" + columns + ".json";
            string path = hostingEnvironment_.WebRootPath + "/Resources/TicTacToe/" + fileName;
            return path;
        }
        [HttpPost("[action]")]
        public Dictionary<string, List<MoveValue>> GetBoardToMoves(int rows, int columns)
        {
            Dictionary<string, List<MoveValue>> boardToMoves = null;

            string path = GetSolutionPath(rows, columns);
            if (System.IO.File.Exists(path))
            {
                string json = System.IO.File.ReadAllText(path);
                boardToMoves = JsonConvert.DeserializeObject<Dictionary<string, List<MoveValue>>>(json);
            }

            return boardToMoves;
        }
        [HttpPost("[action]")]
        public void SerializeBoardToMoves([FromBody] Dictionary<string, List<MoveValue>> boardToMoves, [FromQuery] int rows, [FromQuery] int columns)
        {
            string path = GetSolutionPath(rows, columns);
            string json = JsonConvert.SerializeObject(boardToMoves);
            System.IO.File.WriteAllText(path, json);
        }
        // GET: api/values
        [HttpGet]
        public IEnumerable<string> Get()
        {
            return new string[] { "value1", "value2" };
        }

        // GET api/values/5
        [HttpGet("{id}")]
        public string Get(int id)
        {
            return "value";
        }

        // POST api/values
        [HttpPost]
        public void Post([FromBody]string value)
        {
        }

        // PUT api/values/5
        [HttpPut("{id}")]
        public void Put(int id, [FromBody]string value)
        {
        }

        // DELETE api/values/5
        [HttpDelete("{id}")]
        public void Delete(int id)
        {
        }
    }
}
